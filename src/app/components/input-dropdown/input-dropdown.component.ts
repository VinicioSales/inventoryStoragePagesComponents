import { TemaService } from '../../services/tema.service';
import { Component, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css'],
  host: {
    '(document:click)': 'handleClick($event)',
  },
})
export class InputDropdownComponent {
  imgSrc?: string;
  imgTemaClaro: string = 'assets/img/dropdown-light-mode.png';
  imgTemaEscuro: string = 'assets/img/dropdown-dark-mode.png';
  itens: string[] = ['Item 1', 'Item 2', 'Item 3'];
  mostrarDropdown: boolean = false;
  borderRadius: string = '10px';

  
  @Input() width: string = '293px'
  @Input() height: string = '50px'
  @Input() placeholder: string = 'input'

  @Output() botaoClicado = new EventEmitter<void>();

  @ViewChild('containerRef') containerRef!: ElementRef;
  
  constructor(private temaService: TemaService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarImg();
    });
  }

  //NOTE - handleBorderRadius
  handleBorderRadius() {
    this.borderRadius = this.mostrarDropdown ? '0px' : '10px';
  }

  //NOTE - handleClick
  handleClick(event: Event) {
    if (this.containerRef && !this.containerRef.nativeElement.contains(event.target)) {
      this.mostrarDropdown = false;
      this.handleBorderRadius();
    }
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.temaService.temaEscuroLigado ? this.imgTemaEscuro : this.imgTemaClaro;
  }

  //NOTE - onClick
  onClick() {
    this.mostrarDropdown = !this.mostrarDropdown;
    this.handleBorderRadius();
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
