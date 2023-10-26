import { Component, Output, EventEmitter } from '@angular/core';
import { TemaService } from '../../services/tema.service';


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
  
  constructor(private temaService: TemaService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarImg();
    });
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.temaService.temaEscuroLigado ? this.imgTemaEscuro : this.imgTemaClaro;
  }

  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }

}
