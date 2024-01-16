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
import { ModalService } from 'src/app/services/modal/modal.service';

describe('EsqueciSenhaComponent', () => {
  let component: EsqueciSenhaComponent;
  let fixture: ComponentFixture<EsqueciSenhaComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let modalServiceMock: jasmine.SpyObj<ModalService>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['recuperarSenha']);
    modalServiceMock = jasmine.createSpyObj('ModalService', ['exibirMensagemModal']);


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
        { provide: AuthService, useValue: authServiceMock },
        { provide: ModalService, useValue: modalServiceMock }
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




  // SECTION - onRecuperarSenha
  describe('onRecuperarSenha', () => {
    const emailMock = 'test@example.com';

    // NOTE - deve exibir mensagem de sucesso quando o email for enviado
    it('deve exibir mensagem de sucesso quando o email for enviado', () => {
      authServiceMock.recuperarSenha.and.returnValue(of({}));
      component.valorEmail = emailMock;
      component.onRecuperarSenha();
      expect(authServiceMock.recuperarSenha).toHaveBeenCalledWith(emailMock);
      expect(modalServiceMock.exibirMensagemModal).toHaveBeenCalledWith(`Token de recuperação enviado para o email ${emailMock}`);
      expect(component.carregando).toBeFalse();
    });

    // NOTE - deve exibir a mensagem de erro em caso de falha
    it('deve exibir a mensagem de erro em caso de falha', () => {
      const errorMsg = 'Erro ao enviar email';
      const errorResponse = new HttpErrorResponse({ status: 404, error: { message: errorMsg } });
      authServiceMock.recuperarSenha.and.returnValue(throwError(() => errorResponse));
      component.valorEmail = emailMock;
      component.onRecuperarSenha();
      expect(authServiceMock.recuperarSenha).toHaveBeenCalledWith(emailMock);
      expect(modalServiceMock.exibirMensagemModal).toHaveBeenCalledWith(errorMsg);
      expect(component.carregando).toBeFalse();
    });
  });

  // !SECTION
});
