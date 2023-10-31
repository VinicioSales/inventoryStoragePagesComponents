import { Component, Output, EventEmitter } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from '../../services/imagem.service'; // Importe o ImagemService

@Component({
  selector: 'app-botao-editar',
  templateUrl: './botao-editar.component.html',
  styleUrls: ['./botao-editar.component.css']
})
export class BotaoEditarComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/editar-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/editar-dark-mode.png';
  
  @Output() botaoClicado = new EventEmitter<void>();
  
  constructor(private temaService: TemaService, private imagemService: ImagemService) { // Adicione o ImagemService ao construtor
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
