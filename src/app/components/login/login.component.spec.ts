import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { InputComponent } from '../input/input.component';
import { BotaoComponent } from '../botao/botao.component';
import { AuthService } from '../../services/auth/auth.service';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';
import { ModalService } from 'src/app/services/modal/modal.service';

describe('LoginComponent', () => {
  let router: Router;
  let routerMock: any;
  let authServiceMock: any;
  let component: LoginComponent;
  let localStorageSpy: jasmine.Spy;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    authServiceMock = {
      login: jasmine.createSpy('login')
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        LoginComponent,
        BotaoComponent,
        InputComponent,
        BotaoTemaComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    localStorageSpy = spyOn(localStorage, 'setItem');
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //SECTION - validarEmail
  describe('validarEmail', () => {
    //NOTE - deve retornar verdadeiro para e-mails válidos
    it('deve retornar verdadeiro para e-mails válidos', () => {
      const emailsValidos = [
        'email@example.com',
        'primeiro.ultimo@example.co.uk',
        'nome+sobrenome@example.com.br'
      ];
      emailsValidos.forEach(email => {
        expect(component.validarEmail(email)).toBeTrue();
      });
    });

    //NOTE - deve retornar falso para e-mails inválidos
    it('deve retornar falso para e-mails inválidos', () => {
      const emailsInvalidos = [
        "saisaisjaisj",
        "semarroba.com",
        "@seminicio.com",
        "test@.com",
        "test@com.",
        "test@ domain.com",
        "test @domain.com",
        "test@domain .com",
        "test@domain.com (com)",
      ];
      
      emailsInvalidos.forEach(email => {
        expect(component.validarEmail(email)).toBeFalse();
      });
    });

    //NOTE - deve retornar falso se o e-mail for nulo ou indefinido
    it('deve retornar falso se o e-mail for nulo ou indefinido', () => {
      expect(component.validarEmail(null)).toBeFalse();
      expect(component.validarEmail(undefined)).toBeFalse();
    });

    //NOTE - deve retornar falso se o e-mail for uma string vazia
    it('deve retornar falso se o e-mail for uma string vazia', () => {
      expect(component.validarEmail('')).toBeFalse();
    });
  });
  //!SECTION




  // SECTION - validarSenha
  describe('validarSenha', () => {
    // NOTE - deve retornar verdadeiro para senhas com 8 ou mais caracteres
    it('deve retornar verdadeiro para senhas com 8 ou mais caracteres', () => {
      const senhasValidas = [
        '12345678',
        'password',
        'abcdefgh',
        '1234abcd',
        '!@#$%^&*',
        'A1b2C3d4',
        'longpassword123'
      ];
      senhasValidas.forEach(senha => {
        expect(component.validarSenha(senha)).toBeTrue();
      });
    });

    // NOTE - deve retornar falso para senhas com menos de 8 caracteres
    it('deve retornar falso para senhas com menos de 8 caracteres', () => {
      const senhasInvalidas = [
        '',
        '1',
        '12',
        '123',
        '1234',
        '12345',
        '123456',
        '1234567',
        'abcdefg',
        '!@#$%^&'
      ];
      senhasInvalidas.forEach(senha => {
        expect(component.validarSenha(senha)).toBeFalse();
      });
    });

    // NOTE - deve retornar falso para senhas que não são do tipo string
    it('deve retornar falso para senhas que não são do tipo string', () => {
      expect(component.validarSenha(12345678)).toBeFalse();
      expect(component.validarSenha({})).toBeFalse();
      expect(component.validarSenha([])).toBeFalse();
      expect(component.validarSenha(true)).toBeFalse();
    });
  });
  //!SECTION




  // SECTION - validarCredenciais
  describe('validarCredenciais', () => {

    // NOTE - deve retornar false e exibir mensagem se os campos estiverem vazios
    it('deve retornar false e exibir mensagem se os campos estiverem vazios', () => {
      component.valorEmail = '';
      component.valorSenha = '';
      spyOn(component.modalService, 'exibirMensagemModal');
      const resultado = component.validarCredenciais();
      expect(resultado).toBeFalse();
      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_CAMPOS_VAZIOS);
    });

    // NOTE - deve retornar false e exibir mensagem se o e-mail for inválido
    it('deve retornar false e exibir mensagem se o e-mail for inválido', () => {
      component.valorEmail = 'email.invalido';
      component.valorSenha = 'senha123';
      spyOn(component.modalService, 'exibirMensagemModal');
      const resultado = component.validarCredenciais();
      expect(resultado).toBeFalse();
      expect(component.modalService.exibirMensagemModal).toHaveBeenCalledWith(ModalService.MENSAGEM_EMAIL_INVALIDO);
    });

    // NOTE - deve retornar true para credenciais válidas
    it('deve retornar true para credenciais válidas', () => {
      component.valorEmail = 'email@valido.com';
      component.valorSenha = 'senha123';
      spyOn(component.modalService, 'exibirMensagemModal');
      spyOn(component, 'fecharMensagemModal');
      const resultado = component.validarCredenciais();
      expect(resultado).toBeTrue();
      expect(component.modalService.exibirMensagemModal).not.toHaveBeenCalled();
      expect(component.fecharMensagemModal).toHaveBeenCalled();
    });
  })

  //!SECTION






  // SECTION - onValorInputChange
  describe('onValorInputChange', () => {
    // NOTE - deve atribuir valor ao 'valorEmail' quando 'inputEmail' é passado
    it('deve atribuir valor ao "valorEmail" quando "inputEmail" é passado', () => {
      const novoValor = 'test@example.com';
      component.onValorInputChange(novoValor, 'inputEmail');
      expect(component.valorEmail).toBe(novoValor);
    });

    // NOTE - deve atribuir valor ao 'valorSenha' quando 'inputSenha' é passado
    it('deve atribuir valor ao "valorSenha" quando "inputSenha" é passado', () => {
      const novoValor = 'password123';
      component.onValorInputChange(novoValor, 'inputSenha');
      expect(component.valorSenha).toBe(novoValor);
    });

    // NOTE - não deve alterar o 'valorEmail' quando 'inputSenha' é passado
    it('não deve alterar o "valorEmail" quando "inputSenha" é passado', () => {
      component.valorEmail = ''; // Definir um valor inicial para garantir o teste
      const novoValor = 'password123';
      component.onValorInputChange(novoValor, 'inputSenha');
      expect(component.valorEmail).toBe('');
    });

    // NOTE - não deve alterar o 'valorSenha' quando 'inputEmail' é passado
    it('não deve alterar o "valorSenha" quando "inputEmail" é passado', () => {
      component.valorSenha = ''; // Definir um valor inicial para garantir o teste
      const novoValor = 'test@example.com';
      component.onValorInputChange(novoValor, 'inputEmail');
      expect(component.valorSenha).toBe('');
    });

    // NOTE - não deve alterar nenhum valor quando um 'inputId' inválido é passado
    it('não deve alterar nenhum valor quando um "inputId" inválido é passado', () => {
      const emailInicial = 'initial@example.com';
      const senhaInicial = 'initial123';
      component.valorEmail = emailInicial;
      component.valorSenha = senhaInicial;
      component.onValorInputChange('newValue', 'inputInvalido');
      expect(component.valorEmail).toBe(emailInicial);
      expect(component.valorSenha).toBe(senhaInicial);
    });

    // NOTE - deve lidar com valores nulos como novoValor
    it('deve lidar com valores nulos como novoValor', () => {
      component.onValorInputChange(null as unknown as string, 'inputEmail');
      expect(component.valorEmail).toBeNull();
      component.onValorInputChange(null as unknown as string, 'inputSenha');
      expect(component.valorSenha).toBeNull();
    });

    // NOTE - deve lidar com valores undefined como novoValor
    it('deve lidar com valores undefined como novoValor', () => {
      component.onValorInputChange(undefined as unknown as string, 'inputEmail');
      expect(component.valorEmail).toBeUndefined();
      component.onValorInputChange(undefined as unknown as string, 'inputSenha');
      expect(component.valorSenha).toBeUndefined();
    });
  });
  //!SECTION





  // SECTION - handleFecharModal
  describe('handleFecharModal', () => {

    // NOTE - deve definir 'mostrarModal' como falso
    it('deve definir "mostrarModal" como falso', () => {
      // Definir mostrarModal como verdadeiro antes de chamar o método para garantir que o teste é significativo
      component.mostrarModal = true;
      component.handleFecharModal();
      expect(component.mostrarModal).toBeFalse();
    });

    // NOTE - deve manter 'mostrarModal' falso se já estiver falso
    it('deve manter "mostrarModal" falso se já estiver falso', () => {
      // Definir mostrarModal como falso para verificar que o estado permanece inalterado após a chamada do método
      component.mostrarModal = false;
      component.handleFecharModal();
      expect(component.mostrarModal).toBeFalse();
    });
  });
  //!SECTION




  // SECTION - navegarRotaEsqueciSenha
  describe('navegarRotaEsqueciSenha', () => {

    // NOTE - deve navegar para a rota '/esqueci-senha'
    it('deve navegar para a rota "/esqueci-senha"', () => {
      component.navegarRotaEsqueciSenha();
      expect(router.navigate).toHaveBeenCalledWith(['/esqueci-senha']);
    });
  });

  //!SECTION




  // SECTION - navegarRotaRegistro
describe('navegarRotaRegistro', () => {

  // NOTE - deve navegar para a rota '/registro'
  it('deve navegar para a rota "/registro"', () => {
    component.navegarRotaRegistro();
    expect(router.navigate).toHaveBeenCalledWith(['/registro']);
  });
});
//!SECTION




  // SECTION - onLogin
  describe('onLogin', () => {

    // NOTE - deve chamar logar() se validarCredenciais retornar true
    it('deve chamar logar() se validarCredenciais retornar true', () => {
      spyOn(component, 'validarCredenciais').and.returnValue(true);
      spyOn(component, 'logar');
      component.onLogin();
      expect(component.validarCredenciais).toHaveBeenCalled();
      expect(component.logar).toHaveBeenCalled();
    });

    // NOTE - não deve chamar logar() se validarCredenciais retornar false
    it('não deve chamar logar() se validarCredenciais retornar false', () => {
      spyOn(component, 'validarCredenciais').and.returnValue(false);
      spyOn(component, 'logar');
      component.onLogin();
      expect(component.validarCredenciais).toHaveBeenCalled();
      expect(component.logar).not.toHaveBeenCalled();
    });
  });
  //!SECTION




  // SECTION - logar
  describe('logar', () => {

    //NOTE - deve armazenar o token e navegar para /home quando o login for bem-sucedido
    it('deve armazenar o token e navegar para /home quando o login for bem-sucedido', () => {
      // ANCHOR - Teste de sucesso
      const fakeResponse = { token: 'fake-token' };
      authServiceMock.login.and.returnValue(of(fakeResponse));
  
      component.valorEmail = 'test@test.com';
      component.valorSenha = 'password123';
      component.logar();
  
      expect(authServiceMock.login).toHaveBeenCalledWith('test@test.com', 'password123');
      expect(localStorageSpy).toHaveBeenCalledWith('token_de_autenticacao', 'fake-token');
      expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    });
  
    //NOTE - deve lidar com a ausência do token na resposta
    it('deve lidar com a ausência do token na resposta', () => {
      // ANCHOR - Teste de resposta sem token
      authServiceMock.login.and.returnValue(of({}));
      component.logar();
      expect(localStorageSpy).not.toHaveBeenCalledWith('token_de_autenticacao', jasmine.any(String));
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  })
  // !SECTION
});
