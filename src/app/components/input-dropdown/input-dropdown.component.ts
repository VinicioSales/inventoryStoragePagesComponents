import { TemaService } from '../../services/tema.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css']
})
export class InputDropdownComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/dropdown-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/dropdown-dark-mode.png';
  
  @Input() width: string = '293px'
  @Input() height: string = '50px'
  @Input() placeholder: string = 'input'

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

  //NOTE - onInputFocus
  onInputFocus(div: HTMLElement) {
    div.classList.add('focused');
  }

  //NOTE - onInputBlur
  onInputBlur(div: HTMLElement) {
      div.classList.remove('focused');
  }

}
