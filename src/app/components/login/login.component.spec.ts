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
});
