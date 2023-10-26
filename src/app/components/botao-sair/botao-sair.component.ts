import { Component, Output, EventEmitter } from '@angular/core';
import { TemaService } from '../../services/tema.service';


@Component({
  selector: 'app-botao-sair',
  templateUrl: './botao-sair.component.html',
  styleUrls: ['./botao-sair.component.css']
})
export class BotaoSairComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/exit-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/exit-dark-mode.png';
  private imgHover: string = 'assets/img/exit-hover.png';  // imagem de hover
  
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

  onHover() {
    console.log("hover");
    console.log(this.imgHover);
    this.imgSrc = this.imgHover;
  }

  onLeave() {
    console.log("leave");
    this.atualizarImg();
  }


  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }
}
