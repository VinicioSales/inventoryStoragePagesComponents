import { Subscription } from 'rxjs';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from 'src/app/services/imagem.service';
import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy } from '@angular/core';


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
  valor: number = 1;
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

  //NOTE - onDiminuir
  onDiminuir() {
    if(this.valor > 0) {
      this.valor = this.valor - 1;
    }
  }
}
