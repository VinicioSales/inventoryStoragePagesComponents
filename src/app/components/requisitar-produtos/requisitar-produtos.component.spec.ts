import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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
import { BotaoTemaComponent } from 'src/app/components/botao-tema/botao-tema.component'
import { BotaoHomeComponent } from 'src/app/components/botao-home/botao-home.component'
import { InputContadorComponent } from 'src/app/components/input-contador/input-contador.component'
import { InputDropdownComponent } from 'src/app/components/input-dropdown/input-dropdown.component'


describe('RequisitarProdutosComponent', () => {
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




  // SECTION - criarNovoProduto
  describe('criarNovoProduto', () => {
    // NOTE - deve criar um novo produto com as propriedades selecionadas
    it('deve criar um novo produto com as propriedades selecionadas', () => {
      // Define o estado inicial do componente
      component.produtoPesquisado = {
        nomeProduto: 'Produto Teste',
        centroCusto: ['Centro Antigo'],
        unidadeMedida: ['Unidade Antiga'],
        quantidade: 10,
        codigoProduto: '123'
      };
      component.quantidadeSelecionado = 5;
      component.centroCustoSelecionado = 'Centro Novo';
      component.unidadeMedidaSelecionado = 'Unidade Nova';

      // Executa o método a ser testado
      const novoProduto: Produto = component.criarNovoProduto();

      // Verifica se o novo produto tem as propriedades corretas
      expect(novoProduto).toEqual({
        nomeProduto: 'Produto Teste',
        centroCusto: 'Centro Novo',
        unidadeMedida: 'Unidade Nova',
        quantidade: 5,
        codigoProduto: '123'
      });
    });
  });
  // !SECTION



  // SECTION - getProdutoAEditar
  describe('getProdutoAEditar', () => {
    // NOTE - deve encontrar e retornar o produto correspondente
    it('deve encontrar e retornar o produto correspondente', () => {
      component.listaProdutos = [
        { nomeProduto: 'Produto 1', centroCusto: ['Centro 1'], unidadeMedida: ['Unidade 1'], quantidade: 5, codigoProduto: '123' },
        { nomeProduto: 'Produto 2', centroCusto: ['Centro 2'], unidadeMedida: ['Unidade 2'], quantidade: 3, codigoProduto: '456' }
      ];
      const produtoAEditar = { nomeProduto: 'Produto 1', centroCusto: '', unidadeMedida: '', quantidade: 0, codigoProduto: '' };
      
      const produtoEncontrado = component.getProdutoAEditar(produtoAEditar);
      
      expect(produtoEncontrado).toEqual({
        nomeProduto: 'Produto 1', centroCusto: ['Centro 1'], unidadeMedida: ['Unidade 1'], quantidade: 5, codigoProduto: '123'
      });
    });

    // NOTE - deve retornar undefined se o produto não for encontrado
    it('deve retornar undefined se o produto não for encontrado', () => {
      component.listaProdutos = [
        { nomeProduto: 'Produto 1', centroCusto: ['Centro 1'], unidadeMedida: ['Unidade 1'], quantidade: 5, codigoProduto: '123' }
      ];
      const produtoNaoExistente = { nomeProduto: 'Produto Inexistente', centroCusto: '', unidadeMedida: '', quantidade: 0, codigoProduto: '' };

      const resultado = component.getProdutoAEditar(produtoNaoExistente);
      
      expect(resultado).toBeUndefined();
    });
  });
  // !SECTION


  // SECTION - adicionarProduto
  describe('adicionarProduto', () => {
    // NOTE - deve exibir mensagem de erro se todos os campos estiverem vazios
    it('deve exibir mensagem de erro se todos os campos estiverem vazios', () => {
      component.nomeProdutoSelecionado = '';
      component.quantidadeSelecionado = 0;
      component.centroCustoSelecionado = '';
      component.unidadeMedidaSelecionado = '';
      spyOn(component.modalService, 'exibirMensagemModal');

      component.adicionarProduto();

      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_CAMPOS_VAZIOS);
    });

    // NOTE - deve exibir mensagem de erro se o produto não estiver selecionado
    it('deve exibir mensagem de erro se o produto não estiver selecionado', () => {
      component.nomeProdutoSelecionado = '';
      component.quantidadeSelecionado = 5;
      component.centroCustoSelecionado = 'Centro Novo';
      component.unidadeMedidaSelecionado = 'Unidade Nova';
      spyOn(component.modalService, 'exibirMensagemModal');

      component.adicionarProduto();

      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_PRODUTO_NAO_SELECIONADO);
    });

    // NOTE - deve exibir mensagem de erro se a unidade de medida não estiver selecionada
    it('deve exibir mensagem de erro se a unidade de medida não estiver selecionada', () => {
      component.nomeProdutoSelecionado = 'Produto Novo';
      component.quantidadeSelecionado = 5;
      component.centroCustoSelecionado = 'Centro Novo';
      component.unidadeMedidaSelecionado = '';
      spyOn(component.modalService, 'exibirMensagemModal');

      component.adicionarProduto();

      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_UNIDADE_MEDIDA_NAO_SELECIONADO);
    });

    // NOTE - deve exibir mensagem de erro se o centro de custo não estiver selecionado
    it('deve exibir mensagem de erro se o centro de custo não estiver selecionado', () => {
      component.nomeProdutoSelecionado = 'Produto Novo';
      component.quantidadeSelecionado = 5;
      component.centroCustoSelecionado = '';
      component.unidadeMedidaSelecionado = 'Unidade Nova';
      spyOn(component.modalService, 'exibirMensagemModal');

      component.adicionarProduto();

      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_CENTRO_CUSTO_NAO_SELECIONADO);
    });

    // NOTE - deve exibir mensagem de erro se a quantidade não estiver selecionada
    it('deve exibir mensagem de erro se a quantidade não estiver selecionada', () => {
      component.nomeProdutoSelecionado = 'Produto Novo';
      component.quantidadeSelecionado = 0;
      component.centroCustoSelecionado = 'Centro Novo';
      component.unidadeMedidaSelecionado = 'Unidade Nova';
      spyOn(component.modalService, 'exibirMensagemModal');

      component.adicionarProduto();

      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_QUANTIDADE_NAO_SELECIONADO);
    });

    // NOTE - deve adicionar um novo produto se todos os campos estiverem preenchidos e o produto ainda não existir na lista
    it('deve adicionar um novo produto se todos os campos estiverem preenchidos e o produto ainda não existir na lista', () => {
      component.nomeProdutoSelecionado = 'Produto Novo';
      component.quantidadeSelecionado = 10;
      component.centroCustoSelecionado = 'Centro Novo';
      component.unidadeMedidaSelecionado = 'Unidade Nova';
      const produtoMock = {
        nomeProduto: 'Produto Novo',
        quantidade: 10,
        centroCusto: 'Centro Novo',
        unidadeMedida: 'Unidade Nova',
        codigoProduto: '789'
      };
      spyOn(component, 'criarNovoProduto').and.returnValue(produtoMock);
      spyOn(component, 'produtoJaAdicionado').and.returnValue(false);
      spyOn(component, 'resetarCamposSelecao');

      component.adicionarProduto();

      expect(component.criarNovoProduto).toHaveBeenCalled();
      expect(component.produtoJaAdicionado).toHaveBeenCalledWith(produtoMock);
      expect(component.produtosSelecionados).toContain(produtoMock);
      expect(component.resetarCamposSelecao).toHaveBeenCalled();
    });

    // NOTE - não deve adicionar um produto se ele já existir na lista
    it('não deve adicionar um produto se ele já existir na lista', () => {
      component.nomeProdutoSelecionado = 'Produto Existente';
      component.quantidadeSelecionado = 5;
      component.centroCustoSelecionado = 'Centro Existente';
      component.unidadeMedidaSelecionado = 'Unidade Existente';
      const produtoExistenteMock = {
        nomeProduto: 'Produto Existente',
        quantidade: 5,
        centroCusto: 'Centro Existente',
        unidadeMedida: 'Unidade Existente',
        codigoProduto: '456'
      };
      spyOn(component, 'criarNovoProduto').and.returnValue(produtoExistenteMock);
      spyOn(component, 'produtoJaAdicionado').and.returnValue(true);

      component.adicionarProduto();

      expect(component.produtoJaAdicionado).toHaveBeenCalledWith(produtoExistenteMock);
      expect(component.produtosSelecionados).not.toContain(produtoExistenteMock);
    });
  });
  // !SECTION





  // SECTION - removerProduto
  describe('removerProduto', () => {
    // NOTE - deve remover o produto especificado da lista de produtos selecionados
    it('deve remover o produto especificado da lista de produtos selecionados', () => {
      const produto1 = { nomeProduto: 'Produto 1', centroCusto: 'Centro 1', unidadeMedida: 'Unidade 1', quantidade: 5, codigoProduto: '123' };
      const produto2 = { nomeProduto: 'Produto 2', centroCusto: 'Centro 2', unidadeMedida: 'Unidade 2', quantidade: 3, codigoProduto: '456' };
      component.produtosSelecionados = [produto1, produto2];

      component.removerProduto(produto1);

      expect(component.produtosSelecionados).not.toContain(produto1);
      expect(component.produtosSelecionados).toContain(produto2);
    });

    // NOTE - não deve alterar a lista se o produto não for encontrado
    it('não deve alterar a lista se o produto não for encontrado', () => {
      const produto1 = { nomeProduto: 'Produto 1', centroCusto: 'Centro 1', unidadeMedida: 'Unidade 1', quantidade: 5, codigoProduto: '123' };
      const produtoInexistente = { nomeProduto: 'Produto Inexistente', centroCusto: 'Centro 3', unidadeMedida: 'Unidade 3', quantidade: 1, codigoProduto: '789' };
      component.produtosSelecionados = [produto1];

      component.removerProduto(produtoInexistente);

      expect(component.produtosSelecionados).toContain(produto1);
      expect(component.produtosSelecionados.length).toBe(1);
    });
  });
  // !SECTION





  // SECTION - editarProduto
  describe('editarProduto', () => {
    // NOTE - deve configurar produtoEmEdicao e atualizar as listas de edição se o produto for encontrado
    it('deve configurar produtoEmEdicao e atualizar as listas de edição se o produto for encontrado', () => {
      const produtoMock: Produto = {
        nomeProduto: 'Produto 1', 
        centroCusto: 'Centro 1', 
        unidadeMedida: 'Unidade 1', 
        quantidade: 5, 
        codigoProduto: '123'
      };
      component.listaProdutos = [
        { nomeProduto: 'Produto 1', centroCusto: ['Centro 1'], unidadeMedida: ['Unidade 1'], quantidade: 5, codigoProduto: '123' }
      ];
      component.produtosSelecionados = [produtoMock];

      spyOn(component, 'getProdutoAEditar').and.returnValue(component.listaProdutos[0]);
      spyOn(component.modalService, 'exibirMensagemModal');

      component.editarProduto(produtoMock);

      expect(component.produtoEmEdicao).toEqual(produtoMock);
      expect(component.centroCustoListaEditado).toEqual(component.listaProdutos[0].centroCusto);
      expect(component.unidadeMedidaListaEditado).toEqual(component.listaProdutos[0].unidadeMedida);
      expect(component.modalService.exibirMensagemModal).not.toHaveBeenCalled();
    });

    // NOTE - deve exibir mensagem de erro se o produto não for encontrado na lista de produtos
    // NOTE - deve exibir mensagem de erro se o produto não for encontrado na lista de produtos
    it('deve exibir mensagem de erro se o produto não for encontrado na lista de produtos', () => {
      const produtoMock: Produto = {
        nomeProduto: 'Produto Inexistente', 
        centroCusto: 'Centro 1', 
        unidadeMedida: 'Unidade 1', 
        quantidade: 5, 
        codigoProduto: '123'
      };
      component.listaProdutos = []; // Lista vazia
      component.produtosSelecionados = [produtoMock];
      
      spyOn(component, 'getProdutoAEditar').and.returnValue(undefined);
      spyOn(component.modalService, 'exibirMensagemModal');

      component.editarProduto(produtoMock);

      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_ERRO_DESCONHECIDO);
    });

    // NOTE - deve configurar produtoEmEdicao e atualizar as listas de edição se o produto for encontrado
    it('deve configurar produtoEmEdicao e atualizar as listas de edição se o produto for encontrado', () => {
      const produtoMock: Produto = {
        nomeProduto: 'Produto 1', 
        centroCusto: 'Centro 1', 
        unidadeMedida: 'Unidade 1', 
        quantidade: 5, 
        codigoProduto: '123'
      };
      component.listaProdutos = [
        { nomeProduto: 'Produto 1', centroCusto: ['Centro 1'], unidadeMedida: ['Unidade 1'], quantidade: 5, codigoProduto: '123' }
      ];
      component.produtosSelecionados = [produtoMock];

      spyOn(component, 'getProdutoAEditar').and.returnValue(component.listaProdutos[0]);
      spyOn(component.modalService, 'exibirMensagemModal');

      component.editarProduto(produtoMock);

      expect(component.produtoEmEdicao).toEqual(produtoMock);
      expect(component.centroCustoListaEditado).toEqual(component.listaProdutos[0].centroCusto);
      expect(component.unidadeMedidaListaEditado).toEqual(component.listaProdutos[0].unidadeMedida);
      expect(component.modalService.exibirMensagemModal).not.toHaveBeenCalled();
    });

    // NOTE - deve exibir mensagem de erro se o produto não for encontrado na lista de produtos selecionados
    it('deve exibir mensagem de erro se o produto não for encontrado na lista de produtos selecionados', () => {
      const produtoParaEditar: Produto = {
        nomeProduto: 'Produto 1', 
        centroCusto: 'Centro 1', 
        unidadeMedida: 'Unidade 1', 
        quantidade: 5, 
        codigoProduto: '123'
      };
      const produtoEncontrado: Produtos = {
        nomeProduto: 'Produto 1', 
        centroCusto: ['Centro 1'], 
        unidadeMedida: ['Unidade 1'], 
        quantidade: 5, 
        codigoProduto: '123'
      };
      component.listaProdutos = [produtoEncontrado];
      component.produtosSelecionados = []; // Lista vazia
      
      spyOn(component, 'getProdutoAEditar').and.returnValue(produtoEncontrado);
      spyOn(component.modalService, 'exibirMensagemModal');

      component.editarProduto(produtoParaEditar);

      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_ERRO_DESCONHECIDO);
    });
  });
  // !SECTION



  // SECTION - editarQuantidade
  describe('editarQuantidade', () => {
    // NOTE - deve atualizar a propriedade quantidadeEditado
    it('deve atualizar a propriedade quantidadeEditado', () => {
      const novaQuantidade = 10;
      component.editarQuantidade(novaQuantidade);
      expect(component.quantidadeEditado).toBe(novaQuantidade);
    });
  });
  // !SECTION



  // SECTION - editarUnidadeMedida
  describe('editarUnidadeMedida', () => {
    // NOTE - deve atualizar a propriedade unidadeMedidaEditado
    it('deve atualizar a propriedade unidadeMedidaEditado', () => {
      const novaUnidadeMedida = 'Litros';
      component.editarUnidadeMedida(novaUnidadeMedida);
      expect(component.unidadeMedidaEditado).toBe(novaUnidadeMedida);
    });
  });
  // !SECTION



  // SECTION - editarCentroCusto
  describe('editarCentroCusto', () => {
    // NOTE - deve atualizar a propriedade centroCustoEditado
    it('deve atualizar a propriedade centroCustoEditado', () => {
      const novoCentroCusto = 'Departamento Financeiro';
      component.editarCentroCusto(novoCentroCusto);
      expect(component.centroCustoEditado).toBe(novoCentroCusto);
    });
  });
  // !SECTION



  // SECTION - onConfirmarEdicao
  describe('onConfirmarEdicao', () => {
    beforeEach(() => {
      component.produtoEmEdicao = { nomeProduto: 'Produto 1', centroCusto: 'Centro 1', unidadeMedida: 'Unidade 1', quantidade: 5, codigoProduto: '123' };
      component.produtosSelecionados = [{ ...component.produtoEmEdicao }];
      component.quantidadeEditado = 10;
      component.centroCustoEditado = 'Novo Centro';
      component.unidadeMedidaEditado = 'Nova Unidade';
    });

    // NOTE - deve atualizar o produto na lista produtosSelecionados
    it('deve atualizar o produto na lista produtosSelecionados', () => {
      component.onConfirmarEdicao();
      const produtoAtualizado = component.produtosSelecionados[0];
      
      expect(produtoAtualizado.quantidade).toBe(10);
      expect(produtoAtualizado.centroCusto).toBe('Novo Centro');
      expect(produtoAtualizado.unidadeMedida).toBe('Nova Unidade');
    });

    // NOTE - deve resetar as variáveis de edição
    it('deve resetar as variáveis de edição', () => {
      component.onConfirmarEdicao();
      expect(component.quantidadeEditado).toBe(0);
      expect(component.centroCustoEditado).toBe('');
      expect(component.unidadeMedidaEditado).toBe('');
      expect(component.produtoEmEdicao).toEqual({quantidade: 0, nomeProduto: '', centroCusto: '', unidadeMedida: '', codigoProduto: ''});
    });
  });
  // !SECTION



  // SECTION - formatarData
  describe('formatarData', () => {
    // NOTE - deve formatar a data corretamente de 'AAAA-MM-DD' para 'DD/MM/AAAA'
    it('deve formatar a data corretamente de "AAAA-MM-DD" para "DD/MM/AAAA"', () => {
      const resultado = component.formatarData('2023-03-15');
      expect(resultado).toBe('15/03/2023');
    });

    // NOTE - deve exibir mensagem de erro se a data estiver em formato inválido
    it('deve exibir mensagem de erro se a data estiver em formato inválido', () => {
      spyOn(component.modalService, 'exibirMensagemModal');
      const resultado = component.formatarData('15-03-2023'); // Formato inválido
      expect(resultado).toBeUndefined();
      expect(component.modalService.exibirMensagemModal)
        .toHaveBeenCalledWith(ModalService.MENSAGEM_DATA_INVALIDA);
    });

    // NOTE - deve exibir mensagem de erro se a data estiver incompleta
    it('deve exibir mensagem de erro se a data estiver incompleta', () => {
      spyOn(component.modalService, 'exibirMensagemModal');
      const resultado = component.formatarData('2023-03');
      console.log('resultado')
      console.log(resultado)
      expect(resultado).toBeUndefined();
      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_DATA_INVALIDA);
    });
  });
  // !SECTION


  // SECTION - handleDataEntrega
  describe('handleDataEntrega', () => {
    // NOTE - deve formatar a data corretamente e atribuir a dataEntrega
    it('deve formatar a data corretamente e atribuir a dataEntrega', () => {
      spyOn(component, 'formatarData').and.returnValue('15/03/2023');
      component.handleDataEntrega('2023-03-15');
      expect(component.formatarData).toHaveBeenCalledWith('2023-03-15');
      expect(component.dataEntrega).toBe('15/03/2023');
    });

    // NOTE - deve lidar com formatos de data inválidos
    it('deve lidar com formatos de data inválidos', () => {
      spyOn(component, 'formatarData').and.returnValue(undefined);
      component.handleDataEntrega('2023-15-03');
      expect(component.formatarData).toHaveBeenCalledWith('2023-15-03');
      expect(component.dataEntrega).toBeUndefined();
    });

    // NOTE - deve lidar com datas incompletas
    it('deve lidar com datas incompletas', () => {
      spyOn(component, 'formatarData').and.returnValue(undefined);
      component.handleDataEntrega('2023-03');
      expect(component.formatarData).toHaveBeenCalledWith('2023-03');
      expect(component.dataEntrega).toBeUndefined();
    });

    // NOTE - deve lidar com datas contendo letras
    it('deve lidar com datas contendo letras', () => {
      spyOn(component, 'formatarData').and.returnValue(undefined);
      component.handleDataEntrega('01-dd-2023');
      expect(component.formatarData).toHaveBeenCalledWith('01-dd-2023');
      expect(component.dataEntrega).toBeUndefined();
    });
  });
  // !SECTION




  // SECTION - validarData
  describe('validarData', () => {
    // NOTE - deve retornar verdadeiro para datas válidas
    it('deve retornar verdadeiro para datas válidas', () => {
      expect(component.validarData('12/12/2020')).toBeTrue();
      expect(component.validarData('01/01/2021')).toBeTrue();
      expect(component.validarData('31/12/2021')).toBeTrue();
    });

    // NOTE - deve retornar falso para formatos de data inválidos
    it('deve retornar falso para formatos de data inválidos', () => {
      expect(component.validarData('2020/12/12')).toBeFalse();
      expect(component.validarData('12-12-2020')).toBeFalse();
      expect(component.validarData('2020-12-12')).toBeFalse();
    });

    // NOTE - deve retornar falso para dias inválidos
    it('deve retornar falso para dias inválidos', () => {
      expect(component.validarData('32/12/2020')).toBeFalse();
      expect(component.validarData('00/12/2020')).toBeFalse();
    });

    // NOTE - deve retornar falso para meses inválidos
    it('deve retornar falso para meses inválidos', () => {
      expect(component.validarData('12/13/2020')).toBeFalse();
      expect(component.validarData('12/00/2020')).toBeFalse();
    });

    // NOTE - deve retornar falso para anos inválidos
    it('deve retornar falso para anos inválidos', () => {
      expect(component.validarData('12/12/0')).toBeFalse();
    });
  });
  // !SECTION





  // SECTION - onSolicitar
  describe('onSolicitar', () => {

    // NOTE - deve exibir mensagem de erro se nenhum produto estiver selecionado
    it('deve exibir mensagem de erro se nenhum produto estiver selecionado', () => {
      spyOn(component.modalService, 'exibirMensagemModal');
      component.produtosSelecionados = [];
      component.onSolicitar();
      expect(component.modalService.exibirMensagemModal)
        .toHaveBeenCalledWith(ModalService.MENSAGEM_SEM_PRODUTOS_SELECIONADOS);
    });

    // NOTE - deve exibir mensagem de erro se a data de entrega não estiver definida
    it('deve exibir mensagem de erro se a data de entrega não estiver definida', () => {
      spyOn(component.modalService, 'exibirMensagemModal');
      component.produtosSelecionados = [{ nomeProduto: 'Produto 1', centroCusto: 'Centro 1', unidadeMedida: 'Unidade 1', quantidade: 5, codigoProduto: '123' }];
      component.dataEntrega = undefined;
      component.onSolicitar();
      expect(component.modalService.exibirMensagemModal)
        .toHaveBeenCalledWith(ModalService.MENSAGEM_DATA_ENTREGA_VAZIO);
    });

    // NOTE - deve exibir mensagem de erro se a data de entrega contém caracteres inválidos
    it('deve exibir mensagem de erro se a data de entrega contém caracteres inválidos', () => {
      spyOn(component.modalService, 'exibirMensagemModal');
      component.produtosSelecionados = [{ nomeProduto: 'Produto 1', centroCusto: 'Centro 1', unidadeMedida: 'Unidade 1', quantidade: 5, codigoProduto: '123' }];
      component.dataEntrega = 'aa/02/2023';
      component.onSolicitar();
      expect(component.modalService.exibirMensagemModal).toHaveBeenCalled();
    });

     // NOTE - deve chamar o serviço getPdf se tudo estiver correto
    it('deve chamar o serviço getPdf se tudo estiver correto', () => {
      component.produtosSelecionados = [{ nomeProduto: 'Produto 1', centroCusto: 'Centro 1', unidadeMedida: 'Unidade 1', quantidade: 5, codigoProduto: '123' }];
      const dadosSolicitacaoMock = {
        produtos: component.produtosSelecionados,
        dataEntrega: '01/01/2023',
        nomeUsuario: 'usuarioTeste'
      };
      const respostaFalsa = { pdfBase64: 'base64string' }; // Simulação de resposta
      spyOn(localStorage, 'getItem').and.returnValue('usuarioTeste');
      requisicoesServiceMock.getPdf.and.returnValue(of(respostaFalsa)); // Configuração do valor de retorno falso
      component.dataEntrega = '01/01/2023';
      component.onSolicitar();
      expect(requisicoesServiceMock.getPdf).toHaveBeenCalledWith(dadosSolicitacaoMock);
    });
  });
  // !SECTION




  // SECTION - onFecharModalPdf
  describe('onFecharModalPdf', () => {
    // NOTE - deve definir 'mostrarPdf' como falso
    it('deve definir "mostrarPdf" como falso', () => {
      component.mostrarPdf = true;

      component.onFecharModalPdf();

      expect(component.mostrarPdf).toBeFalse();
    });

    // NOTE - deve manter 'mostrarPdf' falso se já estiver falso
    it('deve manter "mostrarPdf" falso se já estiver falso', () => {
      component.mostrarPdf = false;

      component.onFecharModalPdf();

      expect(component.mostrarPdf).toBeFalse();
    });
  });
  // !SECTION



  // SECTION - onConfirmarSolicitacao
  describe('onConfirmarSolicitacao', () => {
    // NOTE - deve exibir mensagem de sucesso com o código da solicitação
    it('deve exibir mensagem de sucesso com o código da solicitação', () => {
      const responseMock = { codigoSolicitacao: '12345' };
      requisicoesServiceMock.criarSolicitacao.and.returnValue(of(responseMock));
      spyOn(component, 'onFecharModalPdf');
      spyOn(component.modalService, 'exibirMensagemModal');

      component.onConfirmarSolicitacao();

      expect(requisicoesServiceMock.criarSolicitacao).toHaveBeenCalledWith(component.produtosSelecionados);
      expect(component.onFecharModalPdf).toHaveBeenCalled();
      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(`Solicitacao criada com código: ${responseMock.codigoSolicitacao}`);
    });

    // NOTE - deve exibir mensagem de erro em caso de falha na solicitação
    it('deve exibir mensagem de erro em caso de falha na solicitação', () => {
      const errorMessage = 'Erro ao criar solicitação';
      const errorResponse = new HttpErrorResponse({
        error: { message: errorMessage },
        status: 500
      });
      requisicoesServiceMock.criarSolicitacao.and.returnValue(throwError(() => errorResponse));
      spyOn(component.modalService, 'exibirMensagemModal');

      component.onConfirmarSolicitacao();

      expect(requisicoesServiceMock.criarSolicitacao).toHaveBeenCalledWith(component.produtosSelecionados);
      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(errorMessage);
    });
  });
  // !SECTION
});
