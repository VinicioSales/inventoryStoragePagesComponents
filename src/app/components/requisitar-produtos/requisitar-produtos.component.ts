import { Component, OnInit, } from '@angular/core';
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';
import { MockServiceProdutosService } from 'src/app/mock/mock-service-produtos.service'


@Component({
  selector: 'app-requisitar-produtos',
  templateUrl: './requisitar-produtos.component.html',
  styleUrls: ['./requisitar-produtos.component.css']
})
export class RequisitarProdutosComponent implements OnInit {
  //NOTE - constructor
  constructor(
    private requisicoes: RequisicoesService,
    private mockProdutos: MockServiceProdutosService,
  ) {}

  ngOnInit(): void {
    this.mockProdutos.getProdutos().subscribe(data => {
      this.listaProdutos = data;
      this.nomeProdutoLista = this.listaProdutos.map(produto => produto.nome_produto);
    });

  }

  //NOTE - variaveis
  produtos: any[] = [];
  quantidade: number = 0;
  listaProdutos: any[] = [];
  produtoPesquisado: any;
  produtosSelecionados: any[] = []
  nomeProdutoLista: string[] = [];
  centroCustoLista: string[] = [];
  unidadeMedidaLista: string[] = [];
  corBotaoSolicitar: string = 'var(--botao-verde)';
  corBotaoSolicitarHover: string = 'var(--botao-verde-hover)';

  //NOTE - selecionarProduto
  selecionarProduto(nomeProdutoSelecionado: string) {
    const produtoEncontrado = this.listaProdutos.find(produto => produto.nome_produto === nomeProdutoSelecionado);
    
    if (produtoEncontrado) {
      this.produtoPesquisado = produtoEncontrado;
      this.centroCustoLista = produtoEncontrado.centro_custo;
      this.unidadeMedidaLista = produtoEncontrado.unidade_medida;
    }
  }


  //NOTE - adicionarProduto
  adicionarProduto() {
    this.produtoPesquisado.quantidade = this.quantidade;
    this.produtosSelecionados.push(this.produtoPesquisado);
  }

  //NOTE - onSolicitar
  onSolicitar() {}
}
