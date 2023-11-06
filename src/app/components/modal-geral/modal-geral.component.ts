import { Component, EventEmitter,  Output } from '@angular/core';

@Component({
  selector: 'app-modal-geral',
  templateUrl: './modal-geral.component.html',
  styleUrls: ['./modal-geral.component.css']
})
export class ModalGeralComponent {
  height: string = '23px'
  corBotao: string = 'var(--botao-verde)'
  corBotaoHover: string = 'var(--botao-verde-hover)'
  mensagem?: string = "Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing ";

  @Output() fecharModal = new EventEmitter<void>();

  //NOTE - onClick
  onClick() {
    this.fecharModal.emit();
  }
}
