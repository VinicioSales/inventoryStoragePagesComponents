import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { InputComponent } from '../input/input.component';
import { BotaoComponent } from '../botao/botao.component';
import { LogoBfComponent } from '../logo-bf/logo-bf.component';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        LoginComponent,
        BotaoComponent,
        InputComponent,
        LogoBfComponent,
        BotaoTemaComponent,
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
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
});
