import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.css']
})
export class BotaoComponent {
  @Input() width: string = "292px"
  @Input() height: string = "39px"
  @Input() texto: string = "botao"

  @Output() botaoClicado = new EventEmitter<void>();

  onClick() {
    this.botaoClicado.emit();
  }
}
