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




  // SECTION - validarCredenciais
  describe('validarCredenciais', () => {
    // NOTE - deve lidar com campos vazios
    it('deve exibir mensagem para campos vazios', () => {
      component.valorEmail = '';
      component.valorSenha = '';
      spyOn(component, 'exibirMensagemModal');
      component.validarCredenciais();
      expect(component.exibirMensagemModal).toHaveBeenCalledWith((component as any).constructor.MENSAGEM_CAMPOS_VAZIOS);
    });

    // NOTE - deve lidar com e-mail inválido
    it('deve exibir mensagem para e-mail inválido', () => {
      component.valorEmail = 'invalido@';
      component.valorSenha = 'senha123';
      spyOn(component, 'exibirMensagemModal');
      component.validarCredenciais();
      expect(component.exibirMensagemModal).toHaveBeenCalledWith((component as any).constructor.MENSAGEM_EMAIL_INVALIDO);
    });

    // NOTE - deve lidar com senha inválida
    it('deve exibir mensagem para senha inválida', () => {
      component.valorEmail = 'valido@dominio.com';
      component.valorSenha = 'short';
      spyOn(component, 'exibirMensagemModal');
      component.validarCredenciais();
      expect(component.exibirMensagemModal).toHaveBeenCalledWith((component as any).constructor.MENSAGEM_SENHA_INVALIDA);
    });

    // NOTE - deve passar com credenciais válidas
    it('deve validar credenciais válidas sem exibir mensagens', () => {
      component.valorEmail = 'valido@dominio.com';
      component.valorSenha = 'senha1234';
      spyOn(component, 'exibirMensagemModal');
      component.validarCredenciais();
      expect(component.exibirMensagemModal).not.toHaveBeenCalled();
      expect(component.mostrarModal).toBeFalse();
      expect(component.mensagemModal).toBe('');
    });

    // NOTE - deve lidar com valores nulos
    it('deve lidar com valores nulos', () => {
      component.valorEmail = undefined;
      component.valorSenha = undefined;
      spyOn(component, 'exibirMensagemModal');
      component.validarCredenciais();
      expect(component.exibirMensagemModal).toHaveBeenCalledWith((component as any).constructor.MENSAGEM_CAMPOS_VAZIOS);
    });

    // NOTE - deve lidar com valores undefined
    it('deve lidar com valores undefined', () => {
      component.valorEmail = undefined;
      component.valorSenha = undefined;
      spyOn(component, 'exibirMensagemModal');
      component.validarCredenciais();
      expect(component.exibirMensagemModal).toHaveBeenCalledWith((component as any).constructor.MENSAGEM_CAMPOS_VAZIOS);
    });
  });
  //!SECTION




  // SECTION - exibirMensagemModal
  describe('exibirMensagemModal', () => {

    // NOTE - deve definir 'mostrarModal' como verdadeiro
    it('deve definir "mostrarModal" como verdadeiro', () => {
      const mensagem = 'Teste de mensagem modal';
      component.exibirMensagemModal(mensagem);
      expect(component.mostrarModal).toBeTrue();
    });

    // NOTE - deve definir a 'mensagemModal' corretamente
    it('deve definir "mensagemModal" corretamente', () => {
      const mensagem = 'Outra mensagem de teste';
      component.exibirMensagemModal(mensagem);
      expect(component.mensagemModal).toBe(mensagem);
    });

    // NOTE - deve tratar mensagens vazias
    it('deve tratar mensagens vazias', () => {
      component.exibirMensagemModal('');
      expect(component.mostrarModal).toBeTrue();
      expect(component.mensagemModal).toBe('');
    });

    // NOTE - deve tratar mensagens nulas
    it('deve tratar mensagens nulas', () => {
      component.exibirMensagemModal(null as unknown as string); // Cast para compatibilizar com o tipo esperado pela função
      expect(component.mostrarModal).toBeTrue();
      expect(component.mensagemModal).toBeNull();
    });

    // NOTE - deve tratar mensagens indefinidas
    it('deve tratar mensagens indefinidas', () => {
      component.exibirMensagemModal(undefined as unknown as string); // Cast para compatibilizar com o tipo esperado pela função
      expect(component.mostrarModal).toBeTrue();
      expect(component.mensagemModal).toBeUndefined();
    });

    // NOTE - deve ser possível exibir diferentes mensagens consecutivamente
    it('deve ser possível exibir diferentes mensagens consecutivamente', () => {
      const primeiraMensagem = 'Primeira mensagem';
      const segundaMensagem = 'Segunda mensagem';
      component.exibirMensagemModal(primeiraMensagem);
      expect(component.mensagemModal).toBe(primeiraMensagem);
      component.exibirMensagemModal(segundaMensagem);
      expect(component.mensagemModal).toBe(segundaMensagem);
    });
  });
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

});
