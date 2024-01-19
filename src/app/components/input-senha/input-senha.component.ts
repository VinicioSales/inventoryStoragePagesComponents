import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TemaService } from 'src/app/services/tema.service';

@Component({
  selector: 'app-input-senha',
  templateUrl: './input-senha.component.html',
  styleUrls: ['./input-senha.component.css']
})
export class InputSenhaComponent implements OnInit {
  @Input() width: string = '100%';
  @Input() height: string = '50px';
  @Input() placeholder: string = 'senha';

  private _mostrarSenha: boolean = false;
  
  @Output() valorChange = new EventEmitter<any>();
  @Output() botaoClicado = new EventEmitter<void>();
  @Output() mudarVizualizacaoSenha = new EventEmitter<void>();

  imgSrc?: string;
  valor: string = '';
  borderRadius: string = '10px';
  mostrarDropdown: boolean = false;

  private imgVisivelTemaClaro: string = 'assets/img/botao-visivel-light-mode.png';
  private imgVisivelTemaEscuro: string = 'assets/img/botao-visivel-dark-mode.png';
  private imgInvisivelTemaClaro: string = 'assets/img/botao-invisivel-light-mode.png';
  private imgInvisivelTemaEscuro: string = 'assets/img/botao-invisivel-dark-mode.png';

  constructor(private temaService: TemaService) {
    this.temaService.temaEscuroLigado$.subscribe(() => {
      this.toggleImagem();
    });
  }

  ngOnInit(): void {
    this.toggleImagem();
  }

  get mostrarSenha(): boolean {
    return this._mostrarSenha;
  }

  @Input()
  set mostrarSenha(valor: boolean) {
    this._mostrarSenha = valor;
    this.toggleImagem();
  }

  onValorChange(novoValor: string): void {
    this.valor = novoValor;
    this.valorChange.emit(this.valor);
  }

  toggleImagem() {
    if (this._mostrarSenha) {
      this.imgSrc = this.temaService.temaEscuroLigado ? this.imgVisivelTemaEscuro : this.imgVisivelTemaClaro;
    } else {
      this.imgSrc = this.temaService.temaEscuroLigado ? this.imgInvisivelTemaEscuro : this.imgInvisivelTemaClaro;
    }
  }

  onClickVizualizacao() {
    this.mostrarSenha = !this.mostrarSenha;
    this.mudarVizualizacaoSenha.emit();
    }
}