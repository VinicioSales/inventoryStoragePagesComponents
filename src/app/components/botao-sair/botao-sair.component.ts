import { Component, Output, EventEmitter } from '@angular/core';
import { TemaService } from '../../services/tema.service';


@Component({
  selector: 'app-botao-sair',
  templateUrl: './botao-sair.component.html',
  styleUrls: ['./botao-sair.component.css']
})
export class BotaoSairComponent {
  public imgSrc?: string;

  constructor(private temaService: TemaService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarImg();
    });
  }

  atualizarImg() {
    this.imgSrc = this.temaService.temaEscuroLigado ? 'assets/img/exit-dark-mode.png' : 'assets/img/exit-light-mode.png';
  }

  @Output() botaoClicado = new EventEmitter<void>();

  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }
}
