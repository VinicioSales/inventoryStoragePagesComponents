import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-geral',
  templateUrl: './modal-geral.component.html',
  styleUrls: ['./modal-geral.component.css']
})
export class ModalGeralComponent {
  height: string = '23px'
  corBotao: string = 'var(--botao-verde)'
  corBotaoHover: string = 'var(--botao-verde-hover)'
  mensagem?: string = "Lorem ipsum dolor sit amet, consectetur adipiscing";
}
