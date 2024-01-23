import { TemaService } from './tema.service';
import { TestBed } from '@angular/core/testing';

describe('TemaService', () => {
  let service: TemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemaService);
    service['_temaEscuroLigado'].next(false);
  });


  // SECTION - temaEscuroLigado
  describe('propriedade temaEscuroLigado', () => {
    // NOTE - deve retornar o valor atual do tema
    it('deve retornar o valor atual do tema', () => {
      expect(service.temaEscuroLigado).toBe(false); 
    });
  });
  //!SECTION

});
