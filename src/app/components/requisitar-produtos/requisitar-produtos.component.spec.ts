import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from 'src/app/services/modal/modal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';

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
  
});
