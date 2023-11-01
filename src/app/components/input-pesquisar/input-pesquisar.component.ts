import { Subscription } from 'rxjs';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from 'src/app/services/imagem.service';
import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-input-pesquisar',
  templateUrl: './input-pesquisar.component.html',
  styleUrls: ['./input-pesquisar.component.css']
})
export class InputPesquisarComponent implements OnInit, OnDestroy{
  @Input() width: string = '293px';
  @Input() height: string = '50px';
  @Input() placeholder: string = 'input';

  @Output() enviarPesquisa = new EventEmitter<string>();

  imgSrc?: string;
  pesquisa: string = '';
  imgTemaEscuro: string = 'assets/img/lupa-dark-mode.png';
  imgTemaClaro: string = 'assets/img/lupa-light-mode.png';

  private subscription = new Subscription();


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
    console.log(this.imgSrc);
  }

  //NOTE - onInputFocus
  onInputFocus(div: HTMLElement) {
    div.classList.add('focused');
  }

  //NOTE - onInputBlur
  onInputBlur(div: HTMLElement) {
    div.classList.remove('focused');
  }

  //NOTE - onPesquisar
  onPesquisar() {
    this.enviarPesquisa.emit(this.pesquisa);
  }

}
