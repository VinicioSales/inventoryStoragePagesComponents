import { TemaService } from '../../services/tema.service';
import { ImagemService } from '../../services/imagem.service';
import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-logo-bf',
  templateUrl: './logo-bf.component.html',
  styleUrls: ['./logo-bf.component.css']
})
export class LogoBfComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/logo-bf-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/logo-bf-dark-mode.png';
  
  constructor(private temaService: TemaService, private imagemService: ImagemService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(() => {
      this.atualizarImg();
    });
  }

  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
    console.log(this.imgSrc)
  }
}
