import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { InputComponent } from '../input/input.component';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';
import { BotaoComponent } from '../botao/botao.component';
import { LogoBfComponent } from '../logo-bf/logo-bf.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EsqueciSenhaComponent } from './esqueci-senha.component';

fdescribe('EsqueciSenhaComponent', () => {
  let component: EsqueciSenhaComponent;
  let fixture: ComponentFixture<EsqueciSenhaComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['recuperarSenha']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        InputComponent,
        BotaoComponent,
        LogoBfComponent,
        BotaoTemaComponent,
        EsqueciSenhaComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    fixture = TestBed.createComponent(EsqueciSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // SECTION - handleFecharModal
  describe('handleFecharModal', () => {
    // NOTE - deve fechar o modal
    it('deve fechar o modal', () => {
      component.mostrarModal = true;
      component.handleFecharModal();
      expect(component.mostrarModal).toBeFalse();
    });
  });
  // !SECTION

  // SECTION - onValorInputChange
  describe('onValorInputChange', () => {
    // NOTE - deve atualizar o valor do email
    it('deve atualizar o valor do email', () => {
      const novoValor = 'test@example.com';
      component.onValorInputChange(novoValor);
      expect(component.valorEmail).toBe(novoValor);
    });
  });
  // !SECTION

  // SECTION - exibirMensagemModal
  describe('exibirMensagemModal', () => {
    // NOTE - deve exibir o modal com a mensagem fornecida
    it('deve exibir o modal com a mensagem fornecida', () => {
      const mensagem = 'Mensagem de teste';
      component.exibirMensagemModal(mensagem);
      expect(component.mostrarModal).toBeTrue();
      expect(component.mensagemModal).toBe(mensagem);
    });
  });
  // !SECTION

  // SECTION - onRecuperarSenha
  describe('onRecuperarSenha', () => {
    // NOTE - deve exibir mensagem de sucesso quando o email for enviado
    it('deve exibir mensagem de sucesso quando o email for enviado', () => {
      const valorEmail = 'test@example.com';
      authServiceMock.recuperarSenha.and.returnValue(of({}));
      component.valorEmail = valorEmail;
      component.onRecuperarSenha();
      expect(authServiceMock.recuperarSenha).toHaveBeenCalledWith(valorEmail);
      expect(component.mostrarModal).toBeTrue();
      expect(component.mensagemModal).toContain(valorEmail);
    });

    // NOTE - deve exibir mensagem de email não encontrado para erro 404
    it('deve exibir mensagem de email não encontrado para erro 404', () => {
      const errorResponse = new HttpErrorResponse({ status: 404 });
      authServiceMock.recuperarSenha.and.returnValue(throwError(() => errorResponse));
      component.onRecuperarSenha();
      expect(component.mostrarModal).toBeTrue();
      expect(component.mensagemModal).toBe('Email não encontrado');
    });

    // NOTE - deve exibir mensagem de erro desconhecido para outros erros
    it('deve exibir mensagem de erro desconhecido para outros erros', () => {
      const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' });
      authServiceMock.recuperarSenha.and.returnValue(throwError(() => errorResponse));
      component.onRecuperarSenha();
      expect(component.mostrarModal).toBeTrue();
      expect(component.mensagemModal).toBe(`Erro desconhecido: ${errorResponse.message}`);
    });
  });
  // !SECTION
});
