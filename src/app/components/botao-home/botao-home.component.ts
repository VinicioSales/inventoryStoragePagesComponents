import { TemaService } from '../../services/tema.service';
import { ImagemService } from '../../services/imagem.service';
import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-botao-home',
  templateUrl: './botao-home.component.html',
  styleUrls: ['./botao-home.component.css']
})
export class BotaoHomeComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/home-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/home-dark-mode.png';
  
  @Output() botaoClicado = new EventEmitter<void>();
  
  constructor(private temaService: TemaService, private imagemService: ImagemService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(() => {
      this.atualizarImg();
    });
  }

  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  }

  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }

}
