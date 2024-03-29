import { TestBed } from '@angular/core/testing';
import { RequisicoesService } from './requisicoes.service';
import { Produto } from 'src/models/produto/produto.models'
import { urlBackend, rotaPdf, rotaSolicitacao, rotaDevolucaoProdutos } from 'src/app/static'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProdutoDevolucao } from 'src/models/produto/produto.models';

describe('RequisicoesService', () => {
  let service: RequisicoesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RequisicoesService]
    });
    service = TestBed.inject(RequisicoesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica se não há requisições pendentes
  });

  // SECTION - getPdf
  describe('getPdf', () => {
    
    // NOTE - deve enviar uma requisição POST para gerar PDF
    it('deve enviar uma requisição POST para gerar PDF', () => {
      const produtosTeste: Produto[] = [
        { quantidade: 1, nomeProduto: 'Produto Teste', centroCusto: 'CC1', codigoProduto: 'COD1', unidadeMedida: 'Un' }
      ];

      const dadosSolicitacao = { produtosSelecionados: produtosTeste };

      service.getPdf(dadosSolicitacao).subscribe(response => {
        expect(response).toBeTruthy(); // Verifica se a resposta é recebida
      });

      const req = httpTestingController.expectOne(`${urlBackend}${rotaPdf}`); 
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ dadosSolicitacao });
      req.flush({});
    });
  });

  // SECTION - criarSolicitacao
  describe('criarSolicitacao', () => {
    
    //NOTE - Deve enviar os dados corretos em uma requisição POST
    it('deve enviar os dados corretos em uma requisição POST', () => {
      const dadosTeste = { /* Dados de teste */ };

      service.criarSolicitacao(dadosTeste).subscribe(response => {
        expect(response).toBeTruthy(); // Adicione expectativas relevantes para a resposta
      });

      const req = httpTestingController.expectOne(`${urlBackend}${rotaSolicitacao}`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ dados: dadosTeste });
      req.flush({}); // Resposta simulada para a requisição
    });
  });

  //SECTION - getProdutosDevolucao
  describe('getProdutosDevolucao', () => {
    //NOTE - deve retornar os dados dos para devolução
    it('deve retornar os dados dos para devolução', () => {
      const mockProdutos: ProdutoDevolucao[] = [{
        quantidade: 12,
        nomeProduto: 'string',
        centroCusto: 'string',
        codigoProduto: 'string',
        unidadeMedida: 'string',
        codigoSolicitacao: 20,
        devolucaoCompleta: true,
      }];
  
      service.getProdutosDevolucao().subscribe(produtos => {
        expect(produtos).toEqual(mockProdutos);
      });
  
      const req = httpTestingController.expectOne(`${urlBackend}${rotaDevolucaoProdutos}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockProdutos);
    });

  })

});
