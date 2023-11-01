import { Subscription } from 'rxjs';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from 'src/app/services/imagem.service';
import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';


@Component({
  selector: 'app-input-contador',
  templateUrl: './input-contador.component.html',
  styleUrls: ['./input-contador.component.css']
})
export class InputContadorComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  
  // Inputs
  @Input() width: string = '293px';
  @Input() height: string = '50px';
  @Input() placeholder: string = 'input';

  // Variáveis
  imgSrc?: string;
  valor: number = 0;
  imgTemaEscuro: string = 'assets/img/dropdown-dark-mode.png';
  imgTemaClaro: string = 'assets/img/dropdown-light-mode.png';

  constructor(private temaService: TemaService, private imagemService: ImagemService) {
    this.atualizarImg(); // Atualizar a imagem quando o componente é criado
  }

  //NOTE - ngOnInit
  ngOnInit(): void {
    this.subscription.add(
      this.temaService.temaEscuroLigado$.subscribe(() => {
        this.atualizarImg();
      })
    );
  }

  //NOTE - ngOnDestroy
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  }

  //NOTE - onInputFocus
  onInputFocus(div: HTMLElement) {
    div.classList.add('focused');
  }

  //NOTE - onInputBlur
  onInputBlur(div: HTMLElement) {
    div.classList.remove('focused');
  }

  onInput(event: any) {
    const input = event.target;
    let value = input.value;

    // Remove caracteres não numéricos, exceto ponto (.)
    value = value.replace(/[^0-9.]/g, '');

    // Substituir pontos adicionais
    const match = value.match(/\./g);
    if (match && match.length > 1) {
        value = value.replace(/\./g, (char: any, index: any, string: string) => {
        return (string.indexOf('.') === index) ? '.' : '';
        });
    }

    // Remove zeros à esquerda, exceto antes do ponto (.)
    value = value.replace(/^0+(?=[1-9])/g, '');
    value = value.replace(/^0+(?=\.\d)/g, '0');

    if (value !== input.value) {
        input.value = value;
    }

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
        this.valor = numericValue;
    } else {
        this.valor = 0; // ou outro valor padrão de sua escolha
    }
  }

  //NOTE - onDiminuir
  onDiminuir() {
    const valorNumerico = Number(this.valor);
    
    if (isNaN(valorNumerico)) {
      this.valor = 0;
    } else if (valorNumerico > 0) {
      this.valor = valorNumerico - 1;
    }
  
    if (this.valor < 0) {
      this.valor = 0;
    }
  }
  
  //NOTE - onAumentar
  onAumentar() {
    const valorNumerico = Number(this.valor);
  
    if (isNaN(valorNumerico)) {
      this.valor = 1;
    } else {
      this.valor = valorNumerico + 1;
    }
  }
  
}
