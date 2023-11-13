import { Component } from '@angular/core';

@Component({
  selector: 'app-requisitar-produtos',
  templateUrl: './requisitar-produtos.component.html',
  styleUrls: ['./requisitar-produtos.component.css']
})
export class RequisitarProdutosComponent {
  //NOTE - variaveis
  quantidade: number = 0;
  uniMedida: string = '';
  codProduto: string = '';
  centroCusto: string = '';
  nomeProduto: string = '';
  corBotaoSolicitar: string = 'var(--botao-verde)';
  corBotaoSolicitarHover: string = 'var(--botao-verde-hover)';

  //NOTE - onAdicionar
  onAdicionar() {}

  //NOTE - onSolicitar
  onSolicitar() {}
}
