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
    //FIXME - MUDAR DO MOCK PARA OFICIAL
    this.mockProdutos.getProdutos().subscribe(data => {
      this.listaProdutos = data;
      this.nomeProdutoLista = this.listaProdutos.map(produto => produto.nomeProduto);
    });

  }

  //NOTE - variaveis
  produtos: any[] = [];
  quantidadeSelecionado: number = 0;
  listaProdutos: any[] = [];
  produtoPesquisado: any;
  produtosSelecionados: any[] = []
  nomeProdutoLista: string[] = [];
  centroCustoLista: string[] = [];
  unidadeMedidaLista: string[] = [];
  centroCustoSelecionado: string = '';
  unidadeMedidaSelecionado: string = '';
  corBotaoSolicitar: string = 'var(--botao-verde)';
  corBotaoSolicitarHover: string = 'var(--botao-verde-hover)';

  //NOTE - selecionarProduto
  selecionarProduto(nomeProdutoSelecionado: string) {
    const produtoEncontrado = this.listaProdutos.find(produto => produto.nomeProduto === nomeProdutoSelecionado);
    
    if (produtoEncontrado) {
      this.produtoPesquisado = produtoEncontrado;
      this.centroCustoLista = produtoEncontrado.centroCusto;
      this.unidadeMedidaLista = produtoEncontrado.unidadeMedida;
    }
  }

  //NOTE - selecionarUnidadeMedida
  selecionarUnidadeMedida(unidadeMedidaSelecionado: string) {
    this.unidadeMedidaSelecionado = unidadeMedidaSelecionado;
  }
  
  //NOTE - selecionarQuantidade
  selecionarQuantidade(quantidadeSelecionado: number) {
    this.quantidadeSelecionado = quantidadeSelecionado;
  }

  //NOTE - selecionarCentroCusto
  selecionarCentroCusto(centroCustoSelecionado: string) {
    this.centroCustoSelecionado = centroCustoSelecionado;
  }


  //NOTE - adicionarProduto
  adicionarProduto() {
    this.produtoPesquisado.quantidade = this.quantidadeSelecionado;
    this.produtoPesquisado.centroCusto = this.centroCustoSelecionado;
    this.produtoPesquisado.unidadeMedida = this.unidadeMedidaSelecionado;
    this.produtosSelecionados.push(this.produtoPesquisado);
  }

  //NOTE - onSolicitar
  onSolicitar() {}
}
