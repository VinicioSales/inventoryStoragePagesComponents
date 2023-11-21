import { Router } from '@angular/router';
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
    private router: Router,
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
  produtoEmEdicao: any = null;
  nomeProdutoLista: string[] = [];
  centroCustoLista: string[] = [];
  
  //FIXME - LIMPAR
  produtosSelecionados: any[] = [
    {nomeProduto: 'Nome Produto1', codigoProduto: 'codigo', quantidade: 2, unidadeMedida: 'kg', centroCusto: 'Centro Custo 1'},
    {nomeProduto: 'Nome Produto2', codigoProduto: 'codigo2', quantidade: 5, unidadeMedida: 'Uni', centroCusto: 'Centro Custo 2'},
  ]
  
  quantidadeEditado: number = 0;
  centroCustoEditado: string = '';
  unidadeMedidaEditado: string = '';
  quantidadeSelecionado: number = 0;
  unidadeMedidaLista: string[] = [];
  nomeProdutoSelecionado: string = '';
  centroCustoSelecionado: string = '';
  unidadeMedidaSelecionado: string = '';
  centroCustoListaEditado: string[] = [];
  unidadeMedidaListaEditado: string[] = [];
  corBotaoSolicitar: string = 'var(--botao-verde)';
  corBotaoSolicitarHover: string = 'var(--botao-verde-hover)';

  //NOTE - home
  home() {
    this.router.navigate(['/home']);
  }

  //NOTE - selecionarProduto
  selecionarProduto(nomeProdutoSelecionado: string) {
    const produtoEncontrado = this.listaProdutos.find(produto => produto.nomeProduto === nomeProdutoSelecionado);
    this.nomeProdutoSelecionado = produtoEncontrado.nomeProduto;
    
    if (produtoEncontrado) {
      this.produtoPesquisado = produtoEncontrado;
      this.centroCustoLista = produtoEncontrado.centroCusto;
      this.unidadeMedidaLista = produtoEncontrado.unidadeMedida;

      this.centroCustoSelecionado = '';
      this.unidadeMedidaSelecionado = '';
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

  //NOTE - criarNovoProduto
  criarNovoProduto() {
    const { quantidadeSelecionado, centroCustoSelecionado, unidadeMedidaSelecionado } = this;
    return {
      ...this.produtoPesquisado,
      quantidade: quantidadeSelecionado,
      centroCusto: centroCustoSelecionado,
      unidadeMedida: unidadeMedidaSelecionado,
    };
  }
  
  //NOTE - produtoJaAdicionado
  produtoJaAdicionado(produtoParaAdicionar: any): boolean {
    return this.produtosSelecionados.some(produto => produto.codigoProduto === produtoParaAdicionar.codigoProduto);
  }

  //NOTE - resetarCamposSelecao
  resetarCamposSelecao() {
    this.centroCustoLista = [];
    this.unidadeMedidaLista = [];
    this.quantidadeSelecionado = 0;
    this.centroCustoSelecionado = '';
    this.nomeProdutoSelecionado = '';
    this.unidadeMedidaSelecionado = '';
  }

  //NOTE - getProdutoAEditar
  getProdutoAEditar(produtoAEditar: any) {
    return this.listaProdutos.find(produto => produto.nomeProduto === produtoAEditar.nomeProduto);
  }


  //NOTE - adicionarProduto
  adicionarProduto() {
    if (this.nomeProdutoSelecionado && this.quantidadeSelecionado && this.centroCustoSelecionado && this.unidadeMedidaSelecionado) {
      const produtoParaAdicionar = this.criarNovoProduto();
  
      if (!this.produtoJaAdicionado(produtoParaAdicionar)) {
        this.produtosSelecionados.push(produtoParaAdicionar);
        this.resetarCamposSelecao();
      }
    }
  }

  //NOTE - removerProduto
  removerProduto(produtoARemover: any) {
    this.produtosSelecionados = this.produtosSelecionados.filter(produto => produto !== produtoARemover);
  }

  //NOTE - editarProduto
  editarProduto(produtoAEditar: any) {
    this.produtoEmEdicao = produtoAEditar;

    // const produtoEncontradoEditar = this.listaProdutos.find(produto => produto.nomeProduto === produtoAEditar.nomeProduto);
    const produtoEncontradoEditar = this.getProdutoAEditar(produtoAEditar);
    this.centroCustoListaEditado = produtoEncontradoEditar.centroCusto;
    this.unidadeMedidaListaEditado = produtoEncontradoEditar.unidadeMedida;
    
    const produtoSelecionadoEditar = this.produtosSelecionados.find(produto => produto.nomeProduto === produtoAEditar.nomeProduto);
    this.quantidadeEditado = produtoSelecionadoEditar.quantidade;
    this.centroCustoEditado = produtoSelecionadoEditar.centroCusto;
    this.unidadeMedidaEditado = produtoSelecionadoEditar.unidadeMedida;

  }

  //NOTE - editarQuantidade
  editarQuantidade(quantidadeEditado: number) {
    this.quantidadeEditado = quantidadeEditado;
  }
  
  //NOTE - editarUnidadeMedida
  editarUnidadeMedida(unidadeMedidaEditado: string) {
    this.unidadeMedidaEditado = unidadeMedidaEditado;
  }

  //NOTE - editarCentroCusto
  editarCentroCusto(centroCustoEditado: string) {
    this.centroCustoEditado = centroCustoEditado;
  }

  //NOTE - onConfirmarEdicao
  onConfirmarEdicao() {
    const index = this.produtosSelecionados.findIndex(produto => produto.nomeProduto === this.produtoEmEdicao.nomeProduto)

    const produtoAtualizado = {
      ...this.produtosSelecionados[index],
      quantidade: this.quantidadeEditado,
      unidadeMedida: this.unidadeMedidaEditado,
      centroCusto: this.centroCustoEditado,
    };

    this.produtosSelecionados[index] = produtoAtualizado;

    this.produtoEmEdicao = null;
  }

  //NOTE - onSolicitar
  onSolicitar() {}
}
