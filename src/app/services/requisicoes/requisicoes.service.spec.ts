import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequisicoesService } from './requisicoes.service';
import { urlBackend } from 'src/app/services/static';

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
    
    //NOTE - Deve realizar uma requisição POST para gerar PDF
    it('deve realizar uma requisição POST para gerar PDF', () => {
      service.getPdf().subscribe(response => {
        expect(response).toBeTruthy(); // Adicione expectativas relevantes para a resposta
      });

      const req = httpTestingController.expectOne(`${urlBackend}/gerar-pdf`);
      expect(req.request.method).toEqual('POST');
      req.flush({}); // Resposta simulada para a requisição
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

      const req = httpTestingController.expectOne(`${urlBackend}/solicitar`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ dados: dadosTeste });
      req.flush({}); // Resposta simulada para a requisição
    });
  });

});
