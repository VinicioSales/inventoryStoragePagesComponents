import { Component, Output, EventEmitter } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from '../../services/imagem.service';

@Component({
  selector: 'app-botao-sair',
  templateUrl: './botao-sair.component.html',
  styleUrls: ['./botao-sair.component.css']
})
export class BotaoSairComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/exit-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/exit-dark-mode.png';
  
  @Output() botaoClicado = new EventEmitter<void>();
  
  constructor(private temaService: TemaService, private imagemService: ImagemService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(() => {
      this.atualizarImg();
    });
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  }

  //NOTE - onHover
  onHover() {
    this.imgSrc = this.imagemService.getExitHover();
  }

  //NOTE - onLeave
  onLeave() {
    this.atualizarImg();
  }

  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }
}
