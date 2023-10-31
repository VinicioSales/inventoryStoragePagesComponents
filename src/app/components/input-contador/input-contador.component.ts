// import { Subscription } from 'rxjs';
// import { TemaService } from 'src/app/services/tema.service'
// import { ImagemService } from 'src/app/services/imagem.service';
// import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { TemaService } from '../../services/tema.service';
import { ImagemService } from 'src/app/services/imagem.service';
import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-input-contador',
  templateUrl: './input-contador.component.html',
  styleUrls: ['./input-contador.component.css']
})
export class InputContadorComponent implements OnInit, OnDestroy {
  // ngOnInit(): void {
  //   this.subscription.add(
  //     this.temaService.temaEscuroLigado$.subscribe(() => {
  //       this.atualizarImg();
  //     })
  //   );
  // }
  // private subscription = new Subscription();

  // @Input() width: string = '293px';
  // @Input() height: string = '50px';
  // @Input() itens: string[] = [];
  // @Input() placeholder: string = 'input';

  // imgSrc?: string;
  // imgTemaEscuro: string = 'assets/img/dropdown-dark-mode.png';
  // imgTemaClaro: string = 'assets/img/dropdown-light-mode.png';

  // //NOTE - constructor
  // constructor(private temaService: TemaService, private imagemService: ImagemService) {
  //   this.temaService.temaEscuroLigado$.subscribe(() => {
  //     this.atualizarImg();
  //   });
  
  //   this.atualizarImg();
  // }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  // //NOTE - atualizarImg
  // atualizarImg() {
  //   this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  // }

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

  //NOTE - ngOnDestroy
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
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
