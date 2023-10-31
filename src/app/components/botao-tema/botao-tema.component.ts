import { Component, } from '@angular/core';
import { TemaService } from '../../services/tema.service';


@Component({
  selector: 'app-botao-tema',
  templateUrl: './botao-tema.component.html',
  styleUrls: ['./botao-tema.component.css']
})
export class BotaoTemaComponent {
  temaEscuro = false;
  imgSrc?: string;

  constructor(private temaService: TemaService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarImg();
    });
  }

  //NOTE - atualizarImg
  atualizarImg() {
    console.log(this.imgSrc);
    this.imgSrc = this.temaService.temaEscuroLigado ? 'assets/img/button-to-light-mode.png' : 'assets/img/button-to-dark-mode.png';
    console.log(this.imgSrc);
  }

  //NOTE - toggleTema
  toggleTema() {
    this.temaService.toggleTema();
    if (this.temaService.temaEscuroLigado) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
