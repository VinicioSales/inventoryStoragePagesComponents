import { TemaService } from '../../services/tema.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css']
})
export class InputDropdownComponent {
  imgSrc?: string;
  imgTemaClaro: string = 'assets/img/dropdown-light-mode.png';
  imgTemaEscuro: string = 'assets/img/dropdown-dark-mode.png';
  itens: string[] = ['Item 1', 'Item 2', 'Item 3'];
  mostrarDropdown: boolean = false;

  
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
    // this.botaoClicado.emit();
    this.mostrarDropdown = !this.mostrarDropdown;
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
