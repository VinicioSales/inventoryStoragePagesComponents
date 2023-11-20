import { TemaService } from '../../services/tema.service';
import { ImagemService } from '../../services/imagem.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botao-confirmar',
  templateUrl: './botao-confirmar.component.html',
  styleUrls: ['./botao-confirmar.component.css']
})
export class BotaoConfirmarComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/confirmar-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/confirmar-dark-mode.png';
  
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

  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }
}
