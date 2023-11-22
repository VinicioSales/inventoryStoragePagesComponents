import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from 'src/app/services/modal/modal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';

import { Router } from '@angular/router';
import { Produto, Produtos } from 'src/models/produto/produto.models'
import { InputComponent } from 'src/app/components/input/input.component'
import { BotaoComponent } from 'src/app/components/botao/botao.component'
import { RequisitarProdutosComponent } from './requisitar-produtos.component';
import { LogoBfComponent } from 'src/app/components/logo-bf/logo-bf.component'
import { BotaoTemaComponent } from 'src/app/components/botao-tema/botao-tema.component'
import { BotaoHomeComponent } from 'src/app/components/botao-home/botao-home.component'
import { InputContadorComponent } from 'src/app/components/input-contador/input-contador.component'
import { InputDropdownComponent } from 'src/app/components/input-dropdown/input-dropdown.component'

fdescribe('RequisitarProdutosComponent', () => {
  let router: Router;
  let component: RequisitarProdutosComponent;
  let modalServiceMock: jasmine.SpyObj<ModalService>;
  let fixture: ComponentFixture<RequisitarProdutosComponent>;
  let requisicoesServiceMock: jasmine.SpyObj<RequisicoesService>;
  
  const produtosMock: Produtos[] = [
    { nomeProduto: 'Produto 1', unidadeMedida: ['kg'], centroCusto: ['centro'], codigoProduto: '123', quantidade: 5 },
  ];

  beforeEach(() => {
    requisicoesServiceMock = jasmine.createSpyObj('RequisicoesService', ['getProdutos', 'getPdf', 'criarSolicitacao']);
    modalServiceMock = jasmine.createSpyObj('ModalService', ['exibirMensagemModal']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        InputComponent,
        BotaoComponent,
        LogoBfComponent,
        BotaoTemaComponent,
        BotaoHomeComponent,
        InputDropdownComponent,
        InputContadorComponent,
        RequisitarProdutosComponent,
      ],
      providers: [
        { provide: RequisicoesService, useValue: requisicoesServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RequisitarProdutosComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    requisicoesServiceMock.getProdutos.and.returnValue(of(produtosMock));
    fixture.detectChanges();

    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //SECTION - ngOnInit
  describe('ngOnInit', () => {
    
  
    beforeEach(() => {
      fixture.detectChanges(); // Dispara o ngOnInit
    });
  
    // NOTE - deve chamar o serviço getProdutos
    it('deve chamar o serviço getProdutos', () => {
      expect(requisicoesServiceMock.getProdutos).toHaveBeenCalled();
    });
  
    // NOTE - deve corretamente definir listaProdutos baseado na resposta do serviço
    it('deve corretamente definir listaProdutos baseado na resposta do serviço', () => {
      expect(component.listaProdutos).toEqual(produtosMock);
    });
  
    // NOTE - deve corretamente definir nomeProdutoLista baseado na listaProdutos
    it('deve corretamente definir nomeProdutoLista baseado na listaProdutos', () => {
      expect(component.nomeProdutoLista).toEqual(produtosMock.map(produto => produto.nomeProduto));
    });
  });
  //!SECTION
  



  // SECTION - home
  describe('home', () => {
    // NOTE - deve navegar para a rota '/home'
    it('deve navegar para a rota "/home"', () => {
      component.home();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });
  });
  // !SECTION



  // SECTION - selecionarProduto
  describe('selecionarProduto', () => {
    // NOTE - deve atualizar corretamente as propriedades quando um produto válido é selecionado
    it('deve atualizar corretamente as propriedades quando um produto válido é selecionado', () => {
      component.listaProdutos = [
        { nomeProduto: 'Produto 1', centroCusto: ['Centro 1'], unidadeMedida: ['Unidade 1'], codigoProduto: '123', quantidade: 5 },
        { nomeProduto: 'Produto 2', centroCusto: ['Centro 2'], unidadeMedida: ['Unidade 2'], codigoProduto: '456', quantidade: 3 }
      ];

      component.selecionarProduto('Produto 1');

      const produtoEsperado = {
        nomeProduto: 'Produto 1', 
        centroCusto: ['Centro 1'], 
        unidadeMedida: ['Unidade 1'], 
        codigoProduto: '123', 
        quantidade: 5
      };

      expect(component.nomeProdutoSelecionado).toBe('Produto 1');
      expect(component.produtoPesquisado).toEqual(produtoEsperado);
      expect(component.centroCustoLista).toEqual(produtoEsperado.centroCusto);
      expect(component.unidadeMedidaLista).toEqual(produtoEsperado.unidadeMedida);
    });
  });
  // !SECTION


  // SECTION - selecionarUnidadeMedida
  describe('selecionarUnidadeMedida', () => {
    // NOTE - deve atualizar a unidade de medida selecionada
    it('deve atualizar a unidade de medida selecionada', () => {
      const unidadeMedidaTeste = 'kg';
      component.selecionarUnidadeMedida(unidadeMedidaTeste);
      expect(component.unidadeMedidaSelecionado).toBe(unidadeMedidaTeste);
    });
  });
  // !SECTION



  // SECTION - selecionarQuantidade
  describe('selecionarQuantidade', () => {
    // NOTE - deve atualizar a quantidade selecionada
    it('deve atualizar a quantidade selecionada', () => {
      const quantidadeTeste = 5;
      component.selecionarQuantidade(quantidadeTeste);
      expect(component.quantidadeSelecionado).toBe(quantidadeTeste);
    });

    // NOTE - deve lidar com valores negativos
    it('deve lidar com valores negativos', () => {
      const quantidadeNegativa = -10;
      component.selecionarQuantidade(quantidadeNegativa);
      expect(component.quantidadeSelecionado).toBe(quantidadeNegativa);
    });

    // NOTE - deve lidar com zero
    it('deve lidar com zero', () => {
      component.selecionarQuantidade(0);
      expect(component.quantidadeSelecionado).toBe(0);
    });
  });
  //!SECTION



  // SECTION - selecionarCentroCusto
  describe('selecionarCentroCusto', () => {
    // NOTE - deve atualizar o centro de custo selecionado
    it('deve atualizar o centro de custo selecionado', () => {
      const centroCustoTeste = 'Centro Custo 1';
      component.selecionarCentroCusto(centroCustoTeste);
      expect(component.centroCustoSelecionado).toBe(centroCustoTeste);
    });

    // NOTE - deve lidar com valores vazios
    it('deve lidar com valores vazios', () => {
      component.selecionarCentroCusto('');
      expect(component.centroCustoSelecionado).toBe('');
    });

  });
  // !SECTION
});
