import { TemaService } from './tema.service';
import { TestBed } from '@angular/core/testing';

describe('TemaService', () => {
  let service: TemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemaService);
    service['_temaEscuroLigado'].next(false);
  });

  // SECTION - atualizarImg
  describe('atualizarImg', () => {
    // NOTE - deve retornar o caminho da imagem do tema escuro quando 'isDark' é verdadeiro
    it('deve retornar o caminho da imagem do tema escuro quando isDark é verdadeiro', () => {
      expect(service.atualizarImg(true)).toBe(service.imgTemaEscuro);
    });

    // NOTE - deve retornar o caminho da imagem do tema claro quando 'isDark' é falso
    it('deve retornar o caminho da imagem do tema claro quando isDark é falso', () => {
      expect(service.atualizarImg(false)).toBe(service.imgTemaClaro);
    });
  });
  //!SECTION


  // SECTION - temaEscuroLigado
  describe('propriedade temaEscuroLigado', () => {
    // NOTE - deve retornar o valor atual do tema
    it('deve retornar o valor atual do tema', () => {
      expect(service.temaEscuroLigado).toBe(false); 
    });
  });
  //!SECTION

});
