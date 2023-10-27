import { TemaService } from '../../services/tema.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botao-ajuda',
  templateUrl: './botao-ajuda.component.html',
  styleUrls: ['./botao-ajuda.component.css']
})
export class BotaoAjudaComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/ajuda.png';
  private imgTemaEscuro: string = 'assets/img/ajuda.png';
  
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
