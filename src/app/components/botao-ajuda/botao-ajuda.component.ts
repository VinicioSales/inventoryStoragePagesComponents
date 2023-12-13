import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from '../../services/imagem.service'; // Importe o ImagemService

@Component({
  selector: 'app-botao-ajuda',
  templateUrl: './botao-ajuda.component.html',
  styleUrls: ['./botao-ajuda.component.css']
})
export class BotaoAjudaComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/ajuda.png';
  private imgTemaEscuro: string = 'assets/img/ajuda.png';

  @Input() texto: string = "";
  @Input() mostrarModalAjuda: boolean = false;
  
  @Output() botaoClicado = new EventEmitter<void>();
  
  constructor(private temaService: TemaService, private imagemService: ImagemService) { // Adicione o ImagemService ao construtor
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(() => {
      this.atualizarImg();
    });
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  }

  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }

  //NOTE - onMostrarModalAjuda
  onMostrarModalAjuda() {
    if (this.texto.trim()) {
      this.mostrarModalAjuda = true;
    }
  }

  //NOTE - offMostrarModalAjuda
  offMostrarModalAjuda() {
    this.mostrarModalAjuda = false;
  }
}
