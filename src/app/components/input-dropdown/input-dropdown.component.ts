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
  //NOTE - varáveis
  imgSrc?: string;
  itemSelecionado: string = '';
  textoPesquisado: string = '';
  borderRadius: string = '10px';
  mostrarDropdown: boolean = false;
  itens: string[] = ['Item 1', 'Item 2', 'Item 3'];
  itensFiltrados: string[] = [...this.itens];
  imgTemaEscuro: string = 'assets/img/dropdown-dark-mode.png';
  imgTemaClaro: string = 'assets/img/dropdown-light-mode.png';

  //NOTE - Inputs
  @Input() width: string = '293px'
  @Input() height: string = '50px'
  @Input() placeholder: string = 'input'

  //NOTE - Outputs
  @Output() botaoClicado = new EventEmitter<void>();
  @Output() itemSelecionadoChange = new EventEmitter<string>();

  //NOTE - Viewchild
  @ViewChild('containerRef') containerRef!: ElementRef;
  
  //NOTE - constructor
  constructor(private temaService: TemaService) {
    this.atualizarImg();

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

  //NOTE - filtrarItens
  filtrarItens() {
    if (this.textoPesquisado.trim() === '') {
      this.itensFiltrados = [...this.itens];
    } else {
      const textoPesquisadoMinusculo = this.textoPesquisado.toLowerCase();
      this.itensFiltrados = this.itens.filter(item => item.toLowerCase().includes(textoPesquisadoMinusculo));
    }
  }
  

  //NOTE - selecionarItem
  selecionarItem(item: string) {
    this.itemSelecionado = item;
    this.textoPesquisado = item;
    this.itemSelecionadoChange.emit(item);
    this.onClick();
  }
}
