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

  //NOTE - ngOnInit
  ngOnInit(): void {
    //FIXME - MUDAR DO MOCK PARA OFICIAL
    this.mockProdutos.getProdutos().subscribe(data => {
      this.listaProdutos = data;
      this.nomeProdutoLista = this.listaProdutos.map(produto => produto.nomeProduto);
    });

  }

  //NOTE - variaveis
  produtos: any[] = [];
  produtoPesquisado: any;
  listaProdutos: any[] = [];
  nomeProdutoLista: string[] = [];
  centroCustoLista: string[] = [];
  produtosSelecionados: any[] = []
  quantidadeSelecionado: number = 0;
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
    const { quantidadeSelecionado, centroCustoSelecionado, unidadeMedidaSelecionado } =  this;
    if (quantidadeSelecionado && centroCustoSelecionado && unidadeMedidaSelecionado) {
      const produtoParaAdicionar = {
        ...this.produtoPesquisado,
        quantidade: quantidadeSelecionado,
        centroCusto: centroCustoSelecionado,
        unidadeMedida: unidadeMedidaSelecionado,
      };

      this.produtosSelecionados.push(produtoParaAdicionar);

      this.quantidadeSelecionado = 0;
      this.centroCustoSelecionado = '';
      this.unidadeMedidaSelecionado = '';
    }
  }

  //NOTE - onSolicitar
  onSolicitar() {}
}
