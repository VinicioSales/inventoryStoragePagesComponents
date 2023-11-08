import { TestBed } from '@angular/core/testing';
import { ImagemService } from './imagem.service';
import { TemaService } from './tema.service';

fdescribe('ImagemService', () => {
  let service: ImagemService;
  let temaService: TemaService;
  let temaServiceSpy: jasmine.SpyObj<TemaService>;

  beforeEach(() => {
    temaServiceSpy = jasmine.createSpyObj('TemaService', [], { 'temaEscuroLigado': true }) // A propriedade precisa ser acessível
    
    TestBed.configureTestingModule({
      providers: [
        ImagemService,
        { provide: TemaService, useValue: temaServiceSpy }
      ]
    });
    
    service = TestBed.inject(ImagemService);
    temaService = TestBed.inject(TemaService);
  });

  // SECTION - atualizarImg
  describe('atualizarImg', () => {

    // NOTE - deve retornar imgTemaClaro quando temaEscuroLigado é falso
    it('deve retornar imgTemaClaro quando temaEscuroLigado é falso', () => {
      const imgClara = 'claro.png';
      const imgEscura = 'escuro.png';
      Object.defineProperty(temaServiceSpy, 'temaEscuroLigado', { get: () => false });
      
      expect(service.atualizarImg(imgClara, imgEscura)).toEqual(imgClara);
    });

    // NOTE - deve retornar imgTemaEscuro quando temaEscuroLigado é verdadeiro
    it('deve retornar imgTemaEscuro quando temaEscuroLigado é verdadeiro', () => {
      const imgClara = 'claro.png';
      const imgEscura = 'escuro.png';
      Object.defineProperty(temaServiceSpy, 'temaEscuroLigado', { get: () => true });
      
      expect(service.atualizarImg(imgClara, imgEscura)).toEqual(imgEscura);
    });
  });
  //!SECTION

  // SECTION - getExitHover
  describe('getExitHover', () => {

    // NOTE - deve retornar o caminho correto para a imagem de hover de saída
    it('deve retornar o caminho correto para a imagem de hover de saída', () => {
      expect(service.getExitHover()).toEqual('assets/img/exit-hover.png');
    });
  });
  //!SECTION

  // SECTION - getRemoverHoverImg
  describe('getRemoverHoverImg', () => {

    // NOTE - deve retornar o caminho correto para a imagem de hover do botão remover
    it('deve retornar o caminho correto para a imagem de hover do botão remover', () => {
      expect(service.getRemoverHoverImg()).toEqual('assets/img/remover-hover.png');
    });
  });
  //!SECTION

  // SECTION - getEditarHoverImg
  describe('getEditarHoverImg', () => {

    // NOTE - deve retornar o caminho correto para a imagem de hover do botão editar
    it('deve retornar o caminho correto para a imagem de hover do botão editar', () => {
      expect(service.getEditarHoverImg()).toEqual('assets/img/editar-hover.png');
    });
  });
  //!SECTION

  // SECTION - getAjudaHoverImg
  describe('getAjudaHoverImg', () => {

    // NOTE - deve retornar o caminho correto para a imagem de hover do botão ajuda
    it('deve retornar o caminho correto para a imagem de hover do botão ajuda', () => {
      expect(service.getAjudaHoverImg()).toEqual('assets/img/ajuda-hover.png');
    });
  });
  //!SECTION
});
