import { ComponentFixture, TestBed } from '@angular/core/testing';
import {InputPesquisarComponent} from 'src/app/components/input-pesquisar/input-pesquisar.component'
import {InputComponent} from 'src/app/components/input/input.component'
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import {BotaoComponent} from 'src/app/components/botao/botao.component'
import { BotaoHomeComponent } from '../botao-home/botao-home.component';
import { Router } from '@angular/router';
import { LogoBfComponent } from '../logo-bf/logo-bf.component'; 
import { DevolucaoProdutoComponent } from './devolucao-produto.component';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ModalDevolucaoComponent } from '../modal-devolucao/modal-devolucao.component';
import { HomeComponent } from '../home/home.component';
import { ModalGeralComponent } from '../modal-geral/modal-geral.component';

fdescribe('DevolucaoProdutoComponent', () => {
  let component: DevolucaoProdutoComponent;
  let fixture: ComponentFixture<DevolucaoProdutoComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach( async() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        MatCheckboxModule,
        FormsModule ],
      declarations: [DevolucaoProdutoComponent,
        InputPesquisarComponent, 
        InputComponent,         
        BotaoComponent, 
        BotaoHomeComponent,   
        LogoBfComponent,
        BotaoTemaComponent,
        ModalDevolucaoComponent,
        HomeComponent,
        ModalGeralComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DevolucaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //SECTION - atualizarFiltroProduto
  describe('atualizarFiltroProduto', () =>{
    //NOTE - deve atualizar filtroProduto quando atualizarFiltroProduto é chamada
    it('deve atualizar filtroProduto quando atualizarFiltroProduto é chamada', () => {
      // Simula o evento de entrada
      const fakeEvent = {
        target: { value: 'novo valor' }
      };
    
      // Chama a função com o evento simulado
      component.atualizarFiltroProduto(fakeEvent as any);
    
      // Verifica se a propriedade foi atualizada
      expect(component.filtroProduto).toEqual('novo valor');
    });
  });

  //SECTION - atualizarFiltroData
  describe('atualizarFiltroData', () =>{
    //NOTE - deve atualizar filtroData quando atualizarFiltroData é chamada
    it('deve atualizar filtroData quando atualizarFiltroData é chamada', () => {
      // Simula o evento de entrada
      const fakeEvent = {
        target: { value: '2023-01-01' }
      };
  
      // Chama a função com o evento simulado
      component.atualizarFiltroData(fakeEvent as any);
  
      // Verifica se a propriedade foi atualizada
      expect(component.filtroData).toEqual('2023-01-01');
    }); 
  });

  //SECTION - atualizarFiltroUsuario
  describe('atualizarFiltroUsuario', () => {
    //NOTE - deve atualizar filtroUsuario quando atualizarFiltroUsuario é chamada
    it('deve atualizar filtroUsuario quando atualizarFiltroUsuario é chamada', () => {
      // Simula o evento de entrada
      const fakeEvent = {
        target: { value: 'usuario teste' }
      };
  
      // Chama a função com o evento simulado
      component.atualizarFiltroUsuario(fakeEvent as any);
  
      // Verifica se a propriedade foi atualizada
      expect(component.filtroUsuario).toEqual('usuario teste');
    });
  });
  
  //SECTION - aplicarFiltros
  describe('aplicarFiltros', () => {
    const produtoMock = {
      nomeProduto: 'Produto Teste',
      codigoProduto: '123',
      usuario: 'Usuario Teste',
      data: '2023-01-01'
    };

    it('deve retornar true quando todos os filtros correspondem', () => {
      component.filtroProduto = 'produto';
      component.filtroData = '2023-01-01';
      component.filtroUsuario = 'Usuario';

      expect(component.aplicarFiltros(produtoMock)).toBeTrue();
    });

    it('deve retornar false quando nenhum dos filtros corresponde', () => {
      component.filtroProduto = 'Outro Produto';
      component.filtroData = '2022-01-01';
      component.filtroUsuario = 'Outro Usuario';

      expect(component.aplicarFiltros(produtoMock)).toBeFalse();
    });

    it('deve retornar true quando alguns filtros correspondem', () => {
      component.filtroProduto = 'produto';
      component.filtroData = ''; // Sem filtro de data
      component.filtroUsuario = 'Usuario';
  
      // Mock de produto que corresponde ao filtroProduto e filtroUsuario
      const produtoMock = {
          nomeProduto: 'Produto Teste',
          codigoProduto: '123',
          usuario: 'Usuario Teste',
          data: '2023-01-01'
      };
  
      // Espera-se true se qualquer um dos filtros corresponder
      expect(component.aplicarFiltros(produtoMock)).toBeTrue();
    });
  
    it('deve retornar true quando os filtros estão vazios', () => {
      component.filtroProduto = '';
      component.filtroData = '';
      component.filtroUsuario = '';

      expect(component.aplicarFiltros(produtoMock)).toBeTrue();
    });   
  });

  //SECTION - onCheckboxChange
  describe('onCheckboxChange', () => {
    let produtoMock: any;

    beforeEach(() => {
        // Mock de um produto
        produtoMock = {
            codigoProduto: '123',
            nome: 'Produto Teste'
        };

        // Inicializa o objeto selectedProdutos como vazio
        component.selectedProdutos = {};
    });

    //NOTE -  Testa a adição de um produto ao selectedProdutos
    it('deve adicionar um produto ao selectedProdutos quando isChecked é true', () => {
        component.onCheckboxChange(produtoMock, true);

        expect(component.selectedProdutos[produtoMock.codigoProduto]).toEqual(produtoMock);
    });

    //NOTE -  Testa a remoção de um produto do selectedProdutos
    it('deve remover um produto do selectedProdutos quando isChecked é false', () => {
        // Primeiro adiciona o produto
        component.selectedProdutos[produtoMock.codigoProduto] = produtoMock;

        // Depois desmarca o checkbox
        component.onCheckboxChange(produtoMock, false);

        expect(component.selectedProdutos[produtoMock.codigoProduto]).toBeUndefined();
    });
});

//SECTION - modalDevolucao
describe('modalDevolucao', () => {
  let produtoMock1: any;
  let produtoMock2: any;

  beforeEach(() => {
      // Mock de produtos
      produtoMock1 = {
          codigoSolicitacao: '001',
          codigoProduto: 'A1',
          nomeProduto: 'Produto 1',
          quantidade: 10,
          unidadeMedida: 'Unidade',
          centroCusto: 'CC1',
          usuario: 'Usuario 1',
          data: '2023-01-01'
      };
      produtoMock2 = {
          codigoSolicitacao: '002',
          codigoProduto: 'A2',
          nomeProduto: 'Produto 2',
          quantidade: 20,
          unidadeMedida: 'Unidade',
          centroCusto: 'CC2',
          usuario: 'Usuario 2',
          data: '2023-01-02'
      };

      // Configura o estado inicial do componente
      component.selectedProdutos = {
          [produtoMock1.codigoProduto]: produtoMock1,
          [produtoMock2.codigoProduto]: produtoMock2
      };
      component.mostrarModal = false;
  });
  //NOTE - deve abrir o modal e definir dadosProdutos com os produtos selecionados
  it('deve abrir o modal e definir dadosProdutos com os produtos selecionados', () => {
      component.modalDevolucao(new Event('click'));

      // Verifica se o modal está aberto
      expect(component.mostrarModal).toBeTrue();

      // Verifica se os dados dos produtos selecionados estão corretos
      expect(component.dadosProdutos).toEqual([
          {
              codigoSolicitacao: produtoMock1.codigoSolicitacao,
              codigoProduto: produtoMock1.codigoProduto,
              nomeProduto: produtoMock1.nomeProduto,
              quantidade: produtoMock1.quantidade,
              unidadeMedida: produtoMock1.unidadeMedida,
              centroCusto: produtoMock1.centroCusto,
              usuario: produtoMock1.usuario,
              data: produtoMock1.data
          },
          {
              codigoSolicitacao: produtoMock2.codigoSolicitacao,
              codigoProduto: produtoMock2.codigoProduto,
              nomeProduto: produtoMock2.nomeProduto,
              quantidade: produtoMock2.quantidade,
              unidadeMedida: produtoMock2.unidadeMedida,
              centroCusto: produtoMock2.centroCusto,
              usuario: produtoMock2.usuario,
              data: produtoMock2.data
          }
      ]);
  });
});

//SECTION - modalDevolucaoProdutos
describe('modalDevolucaoProdutos', () => {
  //NOTE - deve definir mostrarModalDevolucao como true
  it('deve definir mostrarModalDevolucao como true', () => {
    component.modalDevolucaoProdutos(new Event('click'));
    expect(component.mostrarModalDevolucao).toBeTrue();
  });
});

//SECTION - onCancelarModalDevolucao
describe('onCancelarModalDevolucao', () => {
  //NOTE - deve definir mostrarModal como false
  it('deve definir mostrarModal como false', () => {
    component.mostrarModal = true; 
    component.onCancelarModalDevolucao(); 
    expect(component.mostrarModal).toBeFalse(); 
  });
});

//SECTION - navegarParaHome
describe('navegarParaHome', () => {
  //NOTE - deve navegar para a rota /home
  it('deve navegar para a rota /home', () => {
    component.navegarParaHome();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});

describe('handleFecharModal', () => {
  it('deve definir mostrarModalAviso como false', () => {
    component.mostrarModalAviso = true; 
    component.handleFecharModal();
    expect(component.mostrarModalAviso).toBeFalse(); 
  });
});


});
