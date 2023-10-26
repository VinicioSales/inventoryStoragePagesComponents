import { Component, Output, EventEmitter } from '@angular/core';
import { TemaService } from '../../services/tema.service';


@Component({
  selector: 'app-botao-tema',
  templateUrl: './botao-tema.component.html',
  styleUrls: ['./botao-tema.component.css']
})
export class BotaoTemaComponent {
  temaEscuro = false;

  public imgSrc?: string;

  constructor(private temaService: TemaService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarImg();
    });
  }

  atualizarImg() {
    this.imgSrc = this.temaService.temaEscuroLigado ? 'assets/img/button-to-light-mode.png' : 'assets/img/button-to-dark-mode.png';
  }

  @Output() darkModeChanged = new EventEmitter<boolean>();


  toggleTema() {
    this.temaService.toggleTema();
    if (this.temaService.temaEscuroLigado) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
