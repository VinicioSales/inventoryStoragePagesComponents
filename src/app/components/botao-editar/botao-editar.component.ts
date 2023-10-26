import { Component, Output, EventEmitter } from '@angular/core';
import { TemaService } from '../../services/tema.service';

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
  
  constructor(private temaService: TemaService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarImg();
    });
  }

  atualizarImg() {
    this.imgSrc = this.temaService.temaEscuroLigado ? this.imgTemaEscuro : this.imgTemaClaro;
  }

  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }

}
