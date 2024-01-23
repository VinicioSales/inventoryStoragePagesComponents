import { Router } from '@angular/router';
import { Component, OnInit, } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service'
import { Produto, Produtos } from 'src/models/produto/produto.models'
import { PdfResponse } from 'src/models/pdf-response/pdf-response.models'
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';

import { nomeUsuarioStorage } from 'src/app/static';
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
    public modalService: ModalService,
    private requisicoesService: RequisicoesService,
    public mockServiceProdutosService: MockServiceProdutosService,
  ) {}

  //NOTE - ngOnInit
  ngOnInit(): void {
    this.mockServiceProdutosService.getProdutos().subscribe((data: Produtos[]) => {
      this.listaProdutos = data;
      this.nomeProdutoLista = this.listaProdutos.map(produto => produto.nomeProduto);
    });

  }

  //NOTE - variaveis
  dataEntrega?: string;
  pdfBase64: string = '';
  mostrarPdf: boolean = false;
  quantidadeEditado: number = 0;
  listaProdutos: Produtos[] = [];
  centroCustoEditado: string = '';
  nomeProdutoLista: string[] = [];
  centroCustoLista: string[] = [];
  unidadeMedidaEditado: string = '';
  quantidadeSelecionado: number = 0;
  unidadeMedidaLista: string[] = [];
  nomeProdutoSelecionado: string = '';
  centroCustoSelecionado: string = '';
  produtosSelecionados: Produto[] = [];
  unidadeMedidaSelecionado: string = '';
  centroCustoListaEditado: string[] = [];
  unidadeMedidaListaEditado: string[] = [];
  corBotaoSolicitar: string = 'var(--botao-verde)';
  corBotaoSolicitarHover: string = 'var(--botao-verde-hover)';
  produtoEmEdicao: Produto =  {quantidade: 0, nomeProduto: '', centroCusto: '', unidadeMedida: '', codigoProduto: '',};
  produtoPesquisado: Produtos = {quantidade: 0, nomeProduto: '', centroCusto: [], unidadeMedida: [], codigoProduto: '',};

  //NOTE - home
  home() {
    this.router.navigate(['/home']);
  }

  //NOTE - selecionarProduto
  selecionarProduto(nomeProdutoSelecionado: string) {
    const produtoEncontrado = this.listaProdutos.find(produto => produto.nomeProduto === nomeProdutoSelecionado);

    if (produtoEncontrado) {
      this.nomeProdutoSelecionado = produtoEncontrado.nomeProduto;
      
      this.produtoPesquisado = produtoEncontrado;
      this.centroCustoLista = produtoEncontrado.centroCusto;
      this.unidadeMedidaLista = produtoEncontrado.unidadeMedida;

      this.centroCustoSelecionado = '';
      this.unidadeMedidaSelecionado = '';
    
    } else {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_PRODUTO_INVALIDO);
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
  criarNovoProduto(): Produto {
    const { quantidadeSelecionado, centroCustoSelecionado, unidadeMedidaSelecionado } = this;
    return {
      ...this.produtoPesquisado,
      quantidade: quantidadeSelecionado,
      centroCusto: centroCustoSelecionado,
      unidadeMedida: unidadeMedidaSelecionado,
    };
  }
  
  //NOTE - produtoJaAdicionado
  produtoJaAdicionado(produtoParaAdicionar: Produto): boolean {
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
  getProdutoAEditar(produtoAEditar: Produto) {
    return this.listaProdutos.find(produto => produto.nomeProduto === produtoAEditar.nomeProduto);
  }

  //NOTE - adicionarProduto
  adicionarProduto() {
    if (!this.nomeProdutoSelecionado && !this.quantidadeSelecionado && !this.centroCustoSelecionado && !this.unidadeMedidaSelecionado) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_CAMPOS_VAZIOS);
      return

    } else if (!this.nomeProdutoSelecionado) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_PRODUTO_NAO_SELECIONADO);
      return

    } else if (!this.unidadeMedidaSelecionado) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_UNIDADE_MEDIDA_NAO_SELECIONADO);
      return

    } else if (!this.centroCustoSelecionado) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_CENTRO_CUSTO_NAO_SELECIONADO);
      return

    } else if (!this.quantidadeSelecionado) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_QUANTIDADE_NAO_SELECIONADO);
      return

    }
    const produtoParaAdicionar = this.criarNovoProduto();

    if (!this.produtoJaAdicionado(produtoParaAdicionar)) {
      this.produtosSelecionados.push(produtoParaAdicionar);
      this.resetarCamposSelecao();
    }
  }

  //NOTE - removerProduto
  removerProduto(produtoARemover: Produto) {
    this.produtosSelecionados = this.produtosSelecionados.filter(produto => produto !== produtoARemover);
  }

  //NOTE - editarProduto
  editarProduto(produtoAEditar: Produto) {
    this.produtoEmEdicao = produtoAEditar;

    const produtoEncontradoEditar = this.getProdutoAEditar(produtoAEditar);
    if (produtoEncontradoEditar) {
      this.centroCustoListaEditado = produtoEncontradoEditar.centroCusto;
      this.unidadeMedidaListaEditado = produtoEncontradoEditar.unidadeMedida;
    
    } else {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_ERRO_DESCONHECIDO);
    }

    const produtoSelecionadoEditar = this.produtosSelecionados.find(produto => produto.nomeProduto === produtoAEditar.nomeProduto);
    if (produtoSelecionadoEditar) {
      this.unidadeMedidaEditado = produtoSelecionadoEditar.unidadeMedida;
      this.quantidadeEditado = produtoSelecionadoEditar.quantidade;
      this.centroCustoEditado = produtoSelecionadoEditar.centroCusto;
    
    } else {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_ERRO_DESCONHECIDO);
    }
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

    this.quantidadeEditado = 0;
    this.centroCustoEditado = '';
    this.unidadeMedidaEditado = '';
    this.produtoEmEdicao = {quantidade: 0, nomeProduto: '', centroCusto: '', unidadeMedida: '', codigoProduto: '',};
  }

  //NOTE - formatarData
  formatarData(dataString: string) {
    const partes = dataString.split('-');
    if (partes.length !== 3 || partes[0].length !== 4 || partes[1].length !== 2 || partes[2].length !== 2) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_DATA_INVALIDA);
      return;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  
  //NOTE - handleDataEntrega
  handleDataEntrega(data: string) {
    this.dataEntrega = this.formatarData(data);
  }

  //NOTE - validarData
  validarData(data: string) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    
    if (!regex.test(data)) {
        return false;
    }

    const partes = data.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const ano = parseInt(partes[2], 10);

    if (dia < 1 || dia > 31) {
        return false;
    }

    if (mes < 1 || mes > 12) {
        return false;
    }

    if (ano < 1) {
        return false;
    }

    return true;
  }


  //NOTE - onSolicitar
  onSolicitar() {
    if (this.produtosSelecionados.length === 0) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_SEM_PRODUTOS_SELECIONADOS);
    } else if (!this.dataEntrega) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_DATA_ENTREGA_VAZIO);
    } else if (!this.validarData(this.dataEntrega)) {
      this.modalService.exibirMensagemModal(ModalService.MENSAGEM_DATA_INVALIDA);
    } else {
      const nomeUsuario = localStorage.getItem(nomeUsuarioStorage);
      const dadosSolicitacao = {
        produtos: this.produtosSelecionados,
        dataEntrega: this.dataEntrega,
        nomeUsuario: nomeUsuario
      };
      this.mockServiceProdutosService.getPdf(dadosSolicitacao).subscribe({
        next: (response: PdfResponse) => {
          this.pdfBase64 = response.pdfBase64;
          this.mostrarPdf = true;
        }
      });
    }
  }

  //NOTE - fecharModalPdf
  onFecharModalPdf() {
    this.mostrarPdf = false;
  }

  //NOTE - onConfirmarSolicitacao
  onConfirmarSolicitacao() {
    this.requisicoesService.criarSolicitacao(this.produtosSelecionados).subscribe({
      next:  (response) => {
        console.log(response);

        this.onFecharModalPdf();

        this.modalService.exibirMensagemModal(`Solicitacao criada com código: ${response.codigoSolicitacao}`);
      },

      error: (error) => {
        console.error(error.error.message);

        this.modalService.exibirMensagemModal(error.error.message);
      }
    });
  }
}
