import { Subscription } from 'rxjs';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from 'src/app/services/imagem.service';
import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy, OnChanges, SimpleChanges, } from '@angular/core';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.css'],
  host: {
    '(document:click)': 'handleClick($event)',
  },
})
export class InputDropdownComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  
  // Inputs
  @Input() width: string = '293px';
  @Input() height: string = '50px';
  @Input() itens: string[] = [];
  @Input() placeholder: string = 'input';

  // Variáveis
  imgSrc?: string;
  itemSelecionado: string = '';
  textoPesquisado: string = '';
  borderRadius: string = '10px';
  mostrarDropdown: boolean = false;
  itensFiltrados?: string[];

  // Imagens para os temas claro e escuro
  imgTemaEscuro: string = 'assets/img/dropdown-dark-mode.png';
  imgTemaClaro: string = 'assets/img/dropdown-light-mode.png';

  // Outputs
  @Output() botaoClicado = new EventEmitter<void>();
  @Output() itemSelecionadoChange = new EventEmitter<string>();

  // Viewchild
  @ViewChild('containerRef') containerRef!: ElementRef;
  
  constructor(private temaService: TemaService, private imagemService: ImagemService) {
    this.atualizarImg(); // Atualizar a imagem quando o componente é criado
  }

  //NOTE - ngOnInit
  ngOnInit(): void {
    this.itensFiltrados = [...this.itens];
    this.subscription.add(
      this.temaService.temaEscuroLigado$.subscribe(() => {
        this.atualizarImg();
      })
    );
  }

  //ngOnChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itens']) {
      this.atualizarItensFiltrados();
    }
  }

  //atualizarItensFiltrados
  atualizarItensFiltrados(): void {
    this.itensFiltrados = [...this.itens];
  }

  //NOTE - ngOnDestroy
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
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
    this.mostrarDropdown = true;
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
    this.onClick();
    this.itemSelecionadoChange.emit(item);
  }
}
