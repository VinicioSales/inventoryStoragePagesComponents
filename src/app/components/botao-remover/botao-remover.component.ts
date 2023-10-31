import { Component, Output, EventEmitter } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from '../../services/imagem.service';

@Component({
  selector: 'app-botao-remover',
  templateUrl: './botao-remover.component.html',
  styleUrls: ['./botao-remover.component.css']
})
export class BotaoRemoverComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/remover-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/remover-dark-mode.png';
  
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
    this.imgSrc = this.imagemService.getRemoverHoverImg();
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
