import { DomSanitizer } from '@angular/platform-browser';
import { ModalPdfComponent } from './modal-pdf.component';

describe('ModalPdfComponent', () => {
  let component: ModalPdfComponent;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    sanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
    
    
    component = new ModalPdfComponent(sanitizer);
  });

  // SECTION - base64ToBlob
  describe('base64ToBlob', () => {

    //NOTE - Deve converter corretamente uma string base64 em um Blob
    it('deve converter corretamente uma string base64 em um Blob', () => {
      const fakeBase64String = window.btoa('fake-binary-data');
      const result = component.base64ToBlob(fakeBase64String);

      expect(result).toBeInstanceOf(Blob);
      expect(result.type).toBe('application/pdf');
    });
  });

  // SECTION - onCancelar
  describe('onCancelar', () => {

    //NOTE - Deve emitir um evento ao cancelar
    it('deve emitir um evento ao cancelar', () => {
      spyOn(component.cancelarPdf, 'emit');

      component.onCancelar();

      expect(component.cancelarPdf.emit).toHaveBeenCalled();
    });
  });

  // SECTION - onConfirmar
  describe('onConfirmar', () => {

    //NOTE - Deve emitir um evento ao confirmar
    it('deve emitir um evento ao confirmar', () => {
      spyOn(component.criarSolicitacao, 'emit');

      component.onConfirmar();

      expect(component.criarSolicitacao.emit).toHaveBeenCalled();
    });
  });

});
