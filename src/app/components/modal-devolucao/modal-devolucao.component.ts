import { Router } from '@angular/router';
import { nomeUsuarioStorage } from 'src/app/static';
import { ModalService } from 'src/app/services/modal/modal.service'
import { ProdutoDevolucao } from 'src/models/produto/produto.models'
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PdfResponse } from 'src/models/pdf-response/pdf-response.models'
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';
import { MockServiceProdutosService } from 'src/app/mock/mock-service-produtos.service'


@Component({
  selector: 'app-modal-devolucao',
  templateUrl: './modal-devolucao.component.html',
  styleUrls: ['./modal-devolucao.component.css']
})
export class ModalDevolucaoComponent {
  pdfBase64: string = '';
  mostrarPdf: boolean = false;
  sucessoDevolucao: boolean = true;
  backgroundBotaoDevolver: string = 'var(--botao-verde)'
  backgroundBotaoCancelar: string = 'var(--botao-vermelho)'
  backgroundBotaoDevolverHover: string = 'var(--botao-verde-hover)'
  backgroundBotaoCancelarHover: string = 'var(--botao-vermelho-hover)'
  textoAjuda: string = "Marque esta opção se todos os itens desta solicitação foram devolvidos ou não serão mais devolvidos. Utilize apenas quando não houver intenção de devolver itens adicionais"
  
  @Input() listaProdutosParaDevolucao: ProdutoDevolucao[] = [];

  @Output() fecharModal = new EventEmitter<void>;
  @Output() fecharModalDevolucao = new EventEmitter<void>;

  //NOTE - constructor
  constructor(
    private router: Router,
    public modalService: ModalService,
    private requisicoesService: RequisicoesService,
    public mockServiceProdutosService: MockServiceProdutosService,
  ) {}


  //NOTE - home
  home() {
    try {
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao navegar para home', error);
    }
  }

  //NOTE - onToggleChange
  onToggleChange(codigoProduto: string, devolucaoCompletaStatus: boolean) {
    try {
      const produto = this.listaProdutosParaDevolucao.find(produto => produto.codigoProduto === codigoProduto);
      if (produto) {
        produto.devolucaoCompleta = devolucaoCompletaStatus
      } else {
        console.error('Produto não encontrado:', codigoProduto);
      }
    } catch (error) {
      console.error('Erro ao alterar status de devolução', error);
    }
  }

  //NOTE - selecionarQuantidade
  selecionarQuantidade(codigoProduto: string, quantidadeSelecionado: number) {
    try {
      const produto = this.listaProdutosParaDevolucao.find(produto => produto.codigoProduto === codigoProduto);
      if (produto) {
        produto.quantidade = quantidadeSelecionado;
      } else {
        console.error('Produto não encontrado:', codigoProduto);
      }
    } catch (error) {
      console.error('Erro ao selecionar quantidade', error);
    }
  }

  //NOTE - onCancelar
  onCancelar() {
    try {
      this.fecharModalDevolucao.emit();
    } catch (error) {
      console.error('Erro ao cancelar', error);
    }
  }

  //NOTE - onDevolver
  onDevolver() {
    try {
      const nomeUsuario = localStorage.getItem(nomeUsuarioStorage);
      if (!nomeUsuario) {
        throw new Error('Nome de usuário não encontrado no armazenamento local.');
      }
      const dadosSolicitacao = {
        produtos: this.listaProdutosParaDevolucao,
        nomeUsuario: nomeUsuario
      };

      this.requisicoesService.getPdfDevolucao(dadosSolicitacao)
        .subscribe({
          next: (response: PdfResponse) => {
            this.pdfBase64 = response.pdfBase64;
            this.mostrarPdf = true;
          },
          error: (error) => {
            console.error('Erro ao gerar PDF', error);
            this.modalService.exibirMensagemModal(error.error);
          }
        });
    } catch (error) {
      console.error('Erro no processo de devolução', error);
    }
  }


  // //NOTE - onConfirmarDevolucao
  // onConfirmarDevolucao() {
  //   this.requisicoesService.devolverProdutos(this.listaProdutosParaDevolucao).subscribe({
  //     next:  (response) => {
  //       this.sucessoDevolucao = true;
  //       console.log(response);

  //       this.onFecharModalPdf();

  //       this.modalService.exibirMensagemModal(`Solicitacao de devolução criada com código: ${response.codigoSolicitacao}`);
  //     },

  //     error: (error) => {
  //       console.error(error.error.message);

  //       this.modalService.exibirMensagemModal(error.error.message);
  //     }
  //   });
  // }

  //NOTE - onConfirmarDevolucao
  onConfirmarDevolucao() {
    try {
      this.requisicoesService.devolverProdutos(this.listaProdutosParaDevolucao).subscribe({
        next: this.handleSuccess.bind(this),
        error: this.handleError.bind(this),
      });
    } catch (error) {
      console.error('Erro ao confirmar devolução', error);
    }
  }
  
  //NOTE - handleSuccess
  private handleSuccess(response: any) {
    this.sucessoDevolucao = true;
    console.log(response);
    this.onFecharModalPdf();
    this.modalService.exibirMensagemModal(`Solicitação de devolução criada com código: ${response.codigoSolicitacao}`);
  }
  

  //NOTE - handleError
  private handleError(error: any) {
    console.error(error.error.message);
    this.modalService.exibirMensagemModal(error.error.message);
  }
  

  //NOTE - onModalGeralFechar
  onModalGeralFechar() {
    try {
      this.modalService.fecharModal();
      if (this.sucessoDevolucao) {
        this.fecharModalDevolucao.emit();
      }
    } catch (error) {
      console.error('Erro ao fechar modal geral', error);
    }
  }

    //NOTE - fecharModalPdf
    onFecharModalPdf() {
      this.mostrarPdf = false;
    }
  

}
