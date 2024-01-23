import { Component, EventEmitter,  Output, Input } from '@angular/core';


@Component({
  selector: 'app-modal-observacao',
  templateUrl: './modal-observacao.component.html',
  styleUrls: ['./modal-observacao.component.css']
})
export class ModalObservacaoComponent {
  @Input() textoObservacao: string = '';

  height: string = '23px'
  corBotaoHover: string = 'var(--botao-verde-hover)'
  corBotaoHoverVernelho: string = 'var(--botao-vermelho-hover)'

  @Input() textoBotao: string = 'Confirmar'
  @Input() corBotao: string = 'var(--botao-verde)'
  @Input() corBotaoVermelho: string = 'var(--botao-vermelho)'

  @Output() fecharModal = new EventEmitter<void>();
  @Output() adicionarObservacao = new EventEmitter<string>();

  


  //NOTE - onClick
  onClick() {
    this.fecharModal.emit();
  }

  onAdicionar(){
    this.adicionarObservacao.emit(this.textoObservacao);
  }

}