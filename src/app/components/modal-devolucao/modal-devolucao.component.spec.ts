import { Router } from '@angular/router';
import { BotaoComponent } from '../botao/botao.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalDevolucaoComponent } from './modal-devolucao.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BotaoAjudaComponent } from '../botao-ajuda/botao-ajuda.component';
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';
import { MockServiceProdutosService } from 'src/app/mock/mock-service-produtos.service';

fdescribe('ModalDevolucaoComponent', () => {
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
});
