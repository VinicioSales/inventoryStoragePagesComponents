import { Component, Output, EventEmitter } from '@angular/core';
import { TemaService } from '../../services/tema.service';


@Component({
  selector: 'app-botao-remover',
  templateUrl: './botao-remover.component.html',
  styleUrls: ['./botao-remover.component.css']
})
export class BotaoRemoverComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/remover-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/remover-dark-mode.png';
  private imgHover: string = 'assets/img/remover-hover.png';
  
  @Output() botaoClicado = new EventEmitter<void>();
  
  constructor(private temaService: TemaService) {
    this.atualizarImg();

    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarImg();
    });
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.temaService.temaEscuroLigado ? this.imgTemaEscuro : this.imgTemaClaro;
  }

  //NOTE - onHover
  onHover() {
    console.log("hover");
    console.log(this.imgHover);
    this.imgSrc = this.imgHover;
  }

  //NOTE - onLeave
  onLeave() {
    console.log("leave");
    this.atualizarImg();
  }

  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }


}
