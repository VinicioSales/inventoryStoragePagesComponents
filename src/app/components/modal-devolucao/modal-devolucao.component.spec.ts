import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { fakeAsync, tick } from '@angular/core/testing';
import { BotaoComponent } from '../botao/botao.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalDevolucaoComponent } from './modal-devolucao.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BotaoAjudaComponent } from '../botao-ajuda/botao-ajuda.component';
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';
import { MockServiceProdutosService } from 'src/app/mock/mock-service-produtos.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ModalDevolucaoComponent', () => {
  let component: ModalDevolucaoComponent;
  let fixture: ComponentFixture<ModalDevolucaoComponent>;
  let mockServiceProdutosService: MockServiceProdutosService;
  let requisicoesService: RequisicoesService;
  let modalService: ModalService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BotaoComponent,
        BotaoAjudaComponent,
        ModalDevolucaoComponent
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [RequisicoesService, ModalService, MockServiceProdutosService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDevolucaoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();

    mockServiceProdutosService = TestBed.inject(MockServiceProdutosService);
    requisicoesService = TestBed.inject(RequisicoesService);
    modalService = TestBed.inject(ModalService);
  });

  //SECTION - home
  describe('home', () => {
    //NOTE - deve navegar para "/home" quando o método home é chamado
    it('deve navegar para "/home" quando o método home é chamado', () => {
      spyOn(router, 'navigate');
      component.home();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    //NOTE - deve tratar erros quando a navegação falha
    it('deve tratar erros quando a navegação falha', () => {
      spyOn(router, 'navigate').and.throwError('Erro de Navegação');
      spyOn(console, 'error');
      component.home();
      expect(console.error).toHaveBeenCalledWith('Erro ao navegar para home', jasmine.any(Error));
    });
  });
  //!SECTION

  //SECTION - onToggleChange
  describe('onToggleChange', () => {
    beforeEach(() => {
      component.listaProdutosParaDevolucao = [
        { 
          quantidade: 10, 
          nomeProduto: 'Produto 123', 
          centroCusto: 'CC123', 
          codigoProduto: '123', 
          unidadeMedida: 'un', 
          codigoSolicitacao: 1, 
          devolucaoCompleta: false 
        },
        { 
          quantidade: 5, 
          nomeProduto: 'Produto 456', 
          centroCusto: 'CC456', 
          codigoProduto: '456', 
          unidadeMedida: 'un', 
          codigoSolicitacao: 2, 
          devolucaoCompleta: false 
        }
      ];
    });

    //NOTE - deve alterar o status de devolução de um produto existente
    it('deve alterar o status de devolução de um produto existente', () => {
      component.onToggleChange('123', true);
      const produtoAlterado = component.listaProdutosParaDevolucao.find(p => p.codigoProduto === '123');
      if (produtoAlterado) {
        expect(produtoAlterado.devolucaoCompleta).toBeTrue();
      }
    });

    //NOTE - deve exibir erro quando o produto não é encontrado
    it('deve exibir erro quando o produto não é encontrado', () => {
      spyOn(console, 'error');
      component.onToggleChange('999', true);
      expect(console.error).toHaveBeenCalledWith('Produto não encontrado:', '999');
    });

    //NOTE - deve tratar exceções durante a alteração do status de devolução
    it('deve tratar exceções durante a alteração do status de devolução', () => {
      spyOn(console, 'error');
      spyOn(component.listaProdutosParaDevolucao, 'find').and.throwError('Erro inesperado');
      component.onToggleChange('123', true);
      expect(console.error).toHaveBeenCalledWith('Erro ao alterar status de devolução', jasmine.any(Error));
    });
  });
  //!SECTION

  //SECTION - selecionarQuantidade
  describe('selecionarQuantidade', () => {
    beforeEach(() => {
      component.listaProdutosParaDevolucao = [
        { 
          quantidade: 10, 
          nomeProduto: 'Produto 123', 
          centroCusto: 'CC123', 
          codigoProduto: '123', 
          unidadeMedida: 'un', 
          codigoSolicitacao: 1, 
          devolucaoCompleta: false 
        },
        { 
          quantidade: 5, 
          nomeProduto: 'Produto 456', 
          centroCusto: 'CC456', 
          codigoProduto: '456', 
          unidadeMedida: 'un', 
          codigoSolicitacao: 2, 
          devolucaoCompleta: false 
        }
      ];
    });

    //NOTE - deve atualizar a quantidade de um produto existente
    it('deve atualizar a quantidade de um produto existente', () => {
      component.selecionarQuantidade('123', 20);
      const produtoAlterado = component.listaProdutosParaDevolucao.find(p => p.codigoProduto === '123');
      expect(produtoAlterado?.quantidade).toEqual(20);
    });

    //NOTE - deve exibir erro quando o produto não é encontrado
    it('deve exibir erro quando o produto não é encontrado', () => {
      spyOn(console, 'error');
      component.selecionarQuantidade('999', 10);
      expect(console.error).toHaveBeenCalledWith('Produto não encontrado:', '999');
    });

    //NOTE - deve tratar exceções durante a atualização da quantidade
    it('deve tratar exceções durante a atualização da quantidade', () => {
      spyOn(console, 'error');
      spyOn(component.listaProdutosParaDevolucao, 'find').and.throwError('Erro inesperado');
      component.selecionarQuantidade('123', 10);
      expect(console.error).toHaveBeenCalledWith('Erro ao selecionar quantidade', jasmine.any(Error));
    });
  });
  //!SECTION


  //SECTION - onCancelar
  describe('onCancelar', () => {
    beforeEach(() => {
      // Inicialização do componente e injeção de dependências, se necessário
    });

    //NOTE - deve emitir o evento fecharModalDevolucao
    it('deve emitir o evento fecharModalDevolucao', () => {
      spyOn(component.fecharModalDevolucao, 'emit');
      component.onCancelar();
      expect(component.fecharModalDevolucao.emit).toHaveBeenCalled();
    });

    //NOTE - deve tratar exceções durante a emissão do evento
    it('deve tratar exceções durante a emissão do evento', () => {
      spyOn(console, 'error');
      spyOn(component.fecharModalDevolucao, 'emit').and.throwError('Erro inesperado');
      component.onCancelar();
      expect(console.error).toHaveBeenCalledWith('Erro ao cancelar', jasmine.any(Error));
    });
  });
  //!SECTION

  //SECTION - onDevolver
  describe('onDevolver', () => {
    //NOTE - deve chamar getPdfDevolucao e atualizar variáveis quando bem-sucedido
    it('deve chamar getPdfDevolucao e atualizar variáveis quando bem-sucedido', () => {
      spyOn(localStorage, 'getItem').and.returnValue('usuario_teste');
      spyOn(requisicoesService, 'getPdfDevolucao').and.returnValue(of({ pdfBase64: 'fake_pdf_data' }));

      component.onDevolver();

      expect(requisicoesService.getPdfDevolucao).toHaveBeenCalled();
      expect(component.pdfBase64).toEqual('fake_pdf_data');
      expect(component.mostrarPdf).toBeTrue(); // Verifica diretamente a propriedade mostrarPdf
    });

    //NOTE - deve tratar erro quando o nome do usuário não é encontrado
    it('deve tratar erro quando o nome do usuário não é encontrado', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(console, 'error');

      component.onDevolver();

      expect(console.error).toHaveBeenCalledWith('Erro no processo de devolução', jasmine.any(Error));
    });

    //NOTE - deve exibir mensagem de erro quando a requisição falha
    it('deve exibir mensagem de erro quando a requisição falha', () => {
      spyOn(localStorage, 'getItem').and.returnValue('usuario_teste');
      spyOn(requisicoesService, 'getPdfDevolucao').and.returnValue(throwError(() => new Error('Erro ao gerar PDF')));
      spyOn(console, 'error');
      spyOn(modalService, 'exibirMensagemModal').and.stub();

      component.onDevolver();

      expect(console.error).toHaveBeenCalledWith('Erro ao gerar PDF', jasmine.any(Error));
      expect(modalService.exibirMensagemModal).toHaveBeenCalled();
    });
  });
  //!SECTION

  //SECTION - onConfirmarDevolucao
  describe('onConfirmarDevolucao', () => {
    beforeEach(() => {
      component.listaProdutosParaDevolucao = [/* produtos de teste */];
      component.observacoes = 'Observações de teste';
      component.pdfBase64 = 'pdf_teste';
    });

    //NOTE - deve chamar devolverProdutos com os dados corretos
    it('deve chamar devolverProdutos com os dados corretos', () => {
      spyOn(localStorage, 'getItem').and.returnValue('usuario_teste');
      spyOn(requisicoesService, 'devolverProdutos').and.returnValue(of(/* resposta de sucesso */));

      component.onConfirmarDevolucao();

      expect(requisicoesService.devolverProdutos).toHaveBeenCalledWith(jasmine.objectContaining({
        produtos: jasmine.any(Array),
        observacoes: 'Observações de teste',
        nomeUsuario: 'usuario_teste',
        pdf: 'pdf_teste'
      }));
    });

    //NOTE - deve tratar erro quando o nome do usuário não é encontrado
    it('deve tratar erro quando o nome do usuário não é encontrado', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(console, 'error');

      component.onConfirmarDevolucao();

      expect(console.error).toHaveBeenCalledWith('Erro ao confirmar devolução', jasmine.any(Error));
    });

    //NOTE - deve lidar com erros durante a chamada devolverProdutos
    it('deve lidar com erros durante a chamada devolverProdutos', fakeAsync(() => {
      spyOn(localStorage, 'getItem').and.returnValue('usuario_teste');

      // Cria um objeto de erro personalizado
      const errorResponse = {
        status: 500,
        error: { message: 'Erro ao gerar PDF' }
      };
      
      spyOn(requisicoesService, 'devolverProdutos').and.returnValue(throwError(() => errorResponse));
      spyOn(modalService, 'exibirMensagemModal');

      component.onConfirmarDevolucao();
      tick(); // Simula a passagem do tempo para resolver operações assíncronas

      expect(modalService.exibirMensagemModal).toHaveBeenCalled();
    }));
  });
  //!SECTION


  //SECTION - onConfirmarDevolucao e handleSuccess
  describe('onConfirmarDevolucao e handleSuccess', () => {
    beforeEach(() => {
      component.listaProdutosParaDevolucao = [/* produtos de teste */];
      component.observacoes = 'Observações de teste';
      component.pdfBase64 = 'pdf_teste';
    });

    //NOTE - deve acionar handleSuccess em uma resposta bem-sucedida
    it('deve acionar handleSuccess em uma resposta bem-sucedida', fakeAsync(() => {
      const responseMock = { codigoSolicitacao: '12345' };
      spyOn(localStorage, 'getItem').and.returnValue('usuario_teste');
      spyOn(requisicoesService, 'devolverProdutos').and.returnValue(of(responseMock));
      spyOn(modalService, 'exibirMensagemModal');

      component.onConfirmarDevolucao();
      tick(); // Espera a resolução da operação assíncrona

      expect(modalService.exibirMensagemModal).toHaveBeenCalledWith(`Solicitação de devolução criada com código: ${responseMock.codigoSolicitacao}`);
    }));

    //NOTE - deve lidar com a ausência do nome do usuário no armazenamento local
    it('deve lidar com a ausência do nome do usuário no armazenamento local', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(console, 'error');

      component.onConfirmarDevolucao();

      expect(console.error).toHaveBeenCalledWith('Erro ao confirmar devolução', jasmine.any(Error));
    });

    //NOTE - deve tratar exceções durante a chamada a devolverProdutos
    it('deve tratar exceções durante a chamada a devolverProdutos', fakeAsync(() => {
      spyOn(localStorage, 'getItem').and.returnValue('usuario_teste');
      
      // Criando um objeto de erro que simula a estrutura de erro de uma requisição HTTP
      const errorResponse = new HttpErrorResponse({
        error: { message: 'Erro na requisição' },
        status: 500,
        statusText: 'Internal Server Error'
      });
    
      spyOn(requisicoesService, 'devolverProdutos').and.returnValue(throwError(() => errorResponse));
      spyOn(console, 'error');
    
      component.onConfirmarDevolucao();
      tick();
    
      expect(console.error).toHaveBeenCalled();
    }));
    
  });
  //!SECTION

   //SECTION - handleError
    describe('handleError', () => {
      it('deve registrar no console e exibir mensagem de erro', fakeAsync(() => {
        const errorMessage = 'Erro ao processar a solicitação';
        const errorResponse = new HttpErrorResponse({
          error: { message: errorMessage },
          status: 500,
          statusText: 'Internal Server Error'
        });

        spyOn(localStorage, 'getItem').and.returnValue('usuario_teste');
        spyOn(requisicoesService, 'devolverProdutos').and.returnValue(throwError(() => errorResponse));
        spyOn(console, 'error');
        spyOn(modalService, 'exibirMensagemModal');

        component.onConfirmarDevolucao();
        tick();

        expect(console.error).toHaveBeenCalledWith(errorMessage);
        expect(modalService.exibirMensagemModal).toHaveBeenCalledWith(errorMessage);
      }));
    });
    //!SECTION

  //SECTION - onModalGeralFechar
  describe('onModalGeralFechar', () => {
    //NOTE - deve fechar o modal e emitir o evento fecharModalDevolucao se sucessoDevolucao é verdadeiro
    it('deve fechar o modal e emitir o evento fecharModalDevolucao se sucessoDevolucao é verdadeiro', () => {
      spyOn(modalService, 'fecharModal');
      spyOn(component.fecharModalDevolucao, 'emit');
      component.sucessoDevolucao = true;

      component.onModalGeralFechar();

      expect(modalService.fecharModal).toHaveBeenCalled();
      expect(component.fecharModalDevolucao.emit).toHaveBeenCalled();
    });

    //NOTE - deve fechar o modal mas não emitir o evento se sucessoDevolucao é falso
    it('deve fechar o modal mas não emitir o evento se sucessoDevolucao é falso', () => {
      spyOn(modalService, 'fecharModal');
      spyOn(component.fecharModalDevolucao, 'emit');
      component.sucessoDevolucao = false;

      component.onModalGeralFechar();

      expect(modalService.fecharModal).toHaveBeenCalled();
      expect(component.fecharModalDevolucao.emit).not.toHaveBeenCalled();
    });

    //NOTE - deve tratar exceções durante o fechamento do modal
    it('deve tratar exceções durante o fechamento do modal', () => {
      spyOn(modalService, 'fecharModal').and.throwError('Erro ao fechar modal');
      spyOn(console, 'error');

      component.onModalGeralFechar();

      expect(console.error).toHaveBeenCalledWith('Erro ao fechar modal geral', jasmine.any(Error));
    });
  });
  //!SECTION

  describe('onFecharModalPdf', () => {
    //NOTE - deve definir mostrarPdf como false
    it('deve definir mostrarPdf como false', () => {
      component.mostrarPdf = true; // Configuração inicial para garantir que a propriedade será alterada

      component.onFecharModalPdf();

      expect(component.mostrarPdf).toBeFalse();
    });
  });
  //!SECTION

  //SECTION - onObservacao
  describe('onObservacao', () => {
    //NOTE - deve definir mostrarModalObservacao como true
    it('deve definir mostrarModalObservacao como true', () => {
      component.onObservacao();

      expect(component.mostrarModalObservacao).toBeTrue();
    });
  });
  //!SECTION

  //SECTION - handleObservacoes
  describe('handleObservacoes', () => {
    const novaObservacao = 'Nova observação';

    //NOTE - deve atualizar a observação e definir mostrarModalObservacao como false
    it('deve atualizar a observação e definir mostrarModalObservacao como false', () => {
      component.handleObervacoes(novaObservacao);

      expect(component.observacoes).toEqual(novaObservacao);
      expect(component.mostrarModalObservacao).toBeFalse();
    });
  });
  //!SECTION

  //SECTION - handleCancelarObservacoes
  describe('handleCancelarObservacoes', () => {
    //NOTE - deve definir mostrarModalObservacao como false
    it('deve definir mostrarModalObservacao como false', () => {
      component.mostrarModalObservacao = true;
  
      component.handleCancelarObservacoes();
  
      expect(component.mostrarModalObservacao).toBe(false);
    });
  });
  //!SECTION
});
