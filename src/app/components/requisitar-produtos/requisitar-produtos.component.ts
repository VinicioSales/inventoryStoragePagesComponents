import { Component } from '@angular/core';

@Component({
  selector: 'app-requisitar-produtos',
  templateUrl: './requisitar-produtos.component.html',
  styleUrls: ['./requisitar-produtos.component.css']
})
export class RequisitarProdutosComponent {
  //NOTE - variaveis
  produtos: any[] = [
    {
      quantidade: 5,
      uniMedida: 'Kg',
      codProduto: '123456',
      centroCusto: 'centro',
      nomeProduto: 'Lorem ipsum dolor sit amet',
    },
    {
      quantidade: 5,
      uniMedida: 'Kg',
      codProduto: '123456',
      centroCusto: 'centro',
      nomeProduto: 'Lorem ipsum dolor sit amet',
    },
    {
      quantidade: 5,
      uniMedida: 'Kg',
      codProduto: '123456',
      centroCusto: 'centro',
      nomeProduto: 'Lorem ipsum dolor sit amet',
    },
    {
      quantidade: 5,
      uniMedida: 'Kg',
      codProduto: '123456',
      centroCusto: 'centro',
      nomeProduto: 'Lorem ipsum dolor sit amet',
    },
    {
      quantidade: 5,
      uniMedida: 'Kg',
      codProduto: '123456',
      centroCusto: 'centro',
      nomeProduto: 'Lorem ipsum dolor sit amet',
    },
  ]
  quantidade: number = 0;
  uniMedida: string = 'aaaaaaa';
  codProduto: string = 'aaaaaaa';
  centroCusto: string = 'aaaaaaa';
  nomeProduto: string = 'aaaaaaa aaaaaaa aaaaaaa aaaaaaa aaaaaaa ';
  corBotaoSolicitar: string = 'var(--botao-verde)';
  corBotaoSolicitarHover: string = 'var(--botao-verde-hover)';

  //NOTE - onAdicionar
  onAdicionar() {}

  //NOTE - onSolicitar
  onSolicitar() {}
}
