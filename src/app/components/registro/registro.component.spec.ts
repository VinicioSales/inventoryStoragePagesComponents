import { ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing'; 
import {BotaoTemaComponent} from 'src/app/components/botao-tema/botao-tema.component';
import {LogoBfComponent} from 'src/app/components/logo-bf/logo-bf.component';
import { RegistroComponent } from './registro.component';
import {InputComponent} from 'src/app/components/input/input.component';
import {BotaoComponent} from 'src/app/components/botao/botao.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';



describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['redefinirSenha', 'registrarUsuario']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy.registrarUsuario.and.returnValue(of({}));
    
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [
        RegistroComponent,
        BotaoTemaComponent,
        LogoBfComponent,
        InputComponent,
        BotaoComponent,
        
      ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
        
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //SECTION - onNomeValueChanged
  describe('onNomeValueChanged', () =>{
    //NOTE - deve receber o valor do input nome
    it('deve receber o valor digitado no input nome', () =>{
      component.onNomeValueChanged('input_nome')
      expect(component.nomeValue).toBe('input_nome');
    });
  })

  //SECTION - onEmailValueChanged
  describe('onEmailValueChanged', () => {
    //NOTE - deve receber o valor do input email
    it('deve receber o valor digitado no input email', () =>{
      component.onEmailValueChanged('input_email')
      expect(component.emailValue).toBe('input_email');
    });

    //SECTION - onSenhaValueChanged
    describe('onSenhaValueChanged', () =>{
      //NOTE - deve receber o valor digitado no input senha
      it('deve receber o valor digitado no input senha', () =>{
        component.onSenhaValueChanged('input_senha')
        expect(component.senhaValue).toBe('input_senha')
      })
    })
  });

  //SECTION - onConfirmarSenhaValueChanged
  describe('onConfirmarSenhaValueChanged', () => {
    //NOTE - deve receber o valor digitado no input confirmar senha
    it('deve receber o valor digitado no input confirma senha', () =>{
      component.onConfirmarSenhaValueChanged('input_confirmar_senha')
      expect(component.confirmarSenhaValue).toBe('input_confirmar_senha')
    })
  })

  //SECTION - handleFecharModal
  describe('handleFecharModal', () =>{
    //NOTE - caso seja falso o modal não será exibido
    it('caso seja falso o modal não será exibido', () =>{
      //abrindo o modal
      component.mostrarModal = true;

      // chamando função para fechar o modal
      component.handleFecharModal()
      expect(component.mostrarModal).toBe(false)
    })
  })

  //SECTION - validarEmail
  describe('validarEmail', () =>{
    //NOTE - Teste email válido
    it('deve retornar true para um email válido', () =>{
      const emailValido = 'usuario@example.com';      
      expect(component.validarEmail(emailValido)).toBeTrue();
    });
    // Teste email inválido
    it('deve retornar false para um email inválido', () =>{
      const emailInvalido = 'usuario.com';
      expect(component.validarEmail(emailInvalido)).toBeFalse();
    })
  })

  //SECTION - validarSenha
  describe('validarSenha', () =>{
    //NOTE - Teste senha com minimo de caracteres
    it('deve retornar true se a senha tiver 8 ou mais caracteres', () =>{
      const senhaValida = '12345678';
      expect(component.validarSenha(senhaValida)).toBeTrue();
    });
    //NOTE -  Teste para senhas com menos de 8 caracteres
    it('deve retornar false se a senha tiver menos de 8 caracteres', () => {
      const senhaInvalida = '12345';
      expect(component.validarSenha(senhaInvalida)).toBeFalse();
    });    
  });

  //SECTION - verificarNumeroNoNome
  describe('verificarNumeroNoNome', () =>{
      //NOTE - Teste para nome com números
      it('deve retornar true se o nome contém números', () => {
        const nomeComNumero = 'Joao123';
        expect(component.verificarNumeroNoNome(nomeComNumero)).toBeTrue();
      });

      //NOTE - Teste para nome sem números
      it('deve retornar false se o nome não contém números', () => {
        const nomeSemNumero = 'Joao';
        expect(component.verificarNumeroNoNome(nomeSemNumero)).toBeFalse();
      });

      //NOTE - Teste para nome vazio
      it('deve retornar false para um nome vazio', () => {
        expect(component.verificarNumeroNoNome('')).toBeFalse();
      });    
  })
  //SECTION - validarCredenciais
  describe('validarCredenciais', () =>{
    //NOTE - Deve retornar false e exibir mensagem modal quando o campo nome estiver vazio
      it('deve retornar false e exibir mensagem modal quando o campo nome estiver vazio', () =>{
        component.nomeValue = '';
        component.emailValue = 'usuario@example.com';
        component.senhaValue = '12345678';
        component.confirmarSenhaValue = '12345678';
        
        // Espione a função exibirMensagemModal para verificar se ela é chamada
        spyOn(component, 'exibirMensagemModal');

        // Executa a função validarCredenciais
        const resultado = component.validarCredenciais();

        // Verifique se a função retorna false
        expect(resultado).toBeFalse();

        // Verifique se a mensagem modal correta é exibida
        expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_CAMPOS_VAZIO);
      });

      //NOTE - Deve retornar false e exibir mensagem modal quando o campo emailValue estiver vazio
      it('deve retornar false e exibir mensagem modal quando o campo email estiver vazio', () =>{
        component.nomeValue = 'nome teste';
        component.emailValue = '';
        component.senhaValue = '12345678';
        component.confirmarSenhaValue = '12345678';

        // Espione a função exibirMensagemModal para verificar se ela é chamada
        spyOn(component, 'exibirMensagemModal');

        // Executa a função validarCredenciais
        const resultado = component.validarCredenciais();

        // Verifique se a função retorna false
        expect(resultado).toBeFalse();

        // Verifique se a mensagem modal correta é exibida
        expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_CAMPOS_VAZIO);
      });
      
      //NOTE - Deve retornar false e exibir mensagem modal quando o campo senhaValue estiver vazio
      it('deve retornar false e exibir mensagem modal quando o campo senha estiver vazio', () =>{
        component.nomeValue = 'nome teste';
        component.emailValue = 'usuario@example.com';
        component.senhaValue = '';
        component.confirmarSenhaValue = '12345678';

        // Espione a função exibirMensagemModal para verificar se ela é chamada
        spyOn(component, 'exibirMensagemModal');

        // Executa a função validarCredenciais
        const resultado = component.validarCredenciais();

        // Verifique se a função retorna false
        expect(resultado).toBeFalse();

        // Verifique se a mensagem modal correta é exibida
        expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_CAMPOS_VAZIO);
      });

      //NOTE - Deve retornar false e exibir mensagem modal quando o campo confirmarSenhaValue estiver vazio
      it('deve retornar false e exibir mensagem modal quando o campo confirmarSenhaValue estiver vazio', () =>{
        component.nomeValue = 'nome teste';
        component.emailValue = 'usuario@example.com';
        component.senhaValue = '12345678';
        component.confirmarSenhaValue = '';

        // Espione a função exibirMensagemModal para verificar se ela é chamada
        spyOn(component, 'exibirMensagemModal');

        // Executa a função validarCredenciais
        const resultado = component.validarCredenciais();

        // Verifique se a função retorna false
        expect(resultado).toBeFalse();

        // Verifique se a mensagem modal correta é exibida
        expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_CAMPOS_VAZIO);
      }); 
      
      //NOTE - Deve retornar false caso cotenha numero no nome
      it('deve retornar false caso cotenha numero no nome', () => {
        component.nomeValue = 'Joao123';
        component.emailValue = 'email@teste.com';
        component.senhaValue = '123456789';
        component.confirmarSenhaValue = '123456789';
        // Espione a função exibirMensagemModal para verificar se ela é chamada
        spyOn(component, 'exibirMensagemModal');

        // Executa a função validarCredenciais
        const resultado = component.validarCredenciais();

        // Verifique se a função retorna false
        expect(resultado).toBeFalse();
        
        // Verifique se a mensagem modal correta é exibida
        expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_FORMATO_NOME_INCORRETO);
      });

      //NOTE - Deve retornar falso caso o email esteja no formado incorreto
      it('deve retornar falso caso o email esteja no formado incorreto', () =>{
        component.nomeValue = 'Joao';
        component.emailValue = 'email#teste.com';
        component.senhaValue = '123456789';
        component.confirmarSenhaValue = '123456789';

        // Espione a função exibirMensagemModal para verificar se ela é chamada
        spyOn(component, 'exibirMensagemModal');

        // Executa a função validarCredenciais
        const resultado = component.validarCredenciais();

        // Verifique se a função retorna false
        expect(resultado).toBeFalse();
        
        // Verifique se a mensagem modal correta é exibida
        expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_EMAIL_INVALIDO);
        });

      //NOTE - Deve retornar falso caso as senhas sejam diferentes
      it('deve retornar falso caso as senhas sejam diferentes', () =>{
        component.nomeValue = 'Joao';
        component.emailValue = 'email@teste.com';
        component.senhaValue = '1234567810';
        component.confirmarSenhaValue = '123456789';

        // Espione a função exibirMensagemModal para verificar se ela é chamada
        spyOn(component, 'exibirMensagemModal');

        // Executa a função validarCredenciais
        const resultado = component.validarCredenciais();

        // Verifique se a função retorna false
        expect(resultado).toBeFalse();
        
        // Verifique se a mensagem modal correta é exibida
        expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_SENHAS_DIFERENTES);
      });

      //NOTE - Deve retornar falso caso a senha tenha menos de 8 caracteres
      it('deve retornar falso caso a senha tenha menos de 8 caracteres', () =>{
        component.nomeValue = 'Joao';
        component.emailValue = 'email@teste.com';
        component.senhaValue = '1234567';
        component.confirmarSenhaValue = '1234567';

         // Espione a função exibirMensagemModal para verificar se ela é chamada
         spyOn(component, 'exibirMensagemModal');

         // Executa a função validarCredenciais
         const resultado = component.validarCredenciais();
 
         // Verifique se a função retorna false
         expect(resultado).toBeFalse();
         
         // Verifique se a mensagem modal correta é exibida
         expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_SENHA_CURTA);
      });

      //NOTE - Deve retornar true e fechar a mensagem modal quando todos os campos são válidos
      it('deve retornar true e fechar a mensagem modal quando todos os campos são válidos', () =>{
        component.nomeValue = 'NomeValido';
        component.emailValue = 'usuario@example.com';
        component.senhaValue = 'senhasegura123';
        component.confirmarSenhaValue = 'senhasegura123';

        // Espionando as funções
        spyOn(component, 'fecharMensagemModal');
        spyOn(component, 'exibirMensagemModal');

        // Executando a função
        const resultado = component.validarCredenciais();

        // Verificações
        expect(resultado).toBeTrue();
        expect(component.fecharMensagemModal).toHaveBeenCalled();
        expect(component.exibirMensagemModal).not.toHaveBeenCalled();
      });
  });

  //SECTION - exibirMensagemModal
  describe('exibirMensagemModal', () =>{
    //NOTE - Deve exibir o modal com a mensagem fornecida
    it('deve exibir o modal com a mensagem fornecida', () =>{
      // Definindo uma mensagem de teste
        const mensagemTeste  = 'Mensagem de teste';

      // Garantindo que o modal inicialmente não está visível
      expect(component.mostrarModal).toBeFalse();
      
      // Executando a função com a mensagem de teste
      component.exibirMensagemModal(mensagemTeste);

      // Verifica se o modal está agora visível
      expect(component.mostrarModal).toBeTrue();

      // Verifica se a mensagem no modal é a mensagem de teste
      expect(component.mensagemModal).toEqual(mensagemTeste);
    });
  });

  //SECTION - exibirMensagemModal
  describe('fecharMensagemModal', () =>{
    //NOTE - Deve fechar o modal e limpar a mensagem
   
    it('deve fechar o modal e limpar a mensagem', () =>{
      // Configura o estado inicial do modal como visível e com uma mensagem
      component.mostrarModal = true;
      component.mensagemModal = 'Mensagem de teste';

      // Executa a função fecharMensagemModal
      component.fecharMensagemModal();

      // Verifica se o modal está agora fechado
      expect(component.mostrarModal).toBeFalse();

      // Verifica se a mensagem foi limpa
      expect(component.mensagemModal).toEqual('');
    });
  });

  //SECTION - onRegistro
  describe('onRegistro', () => {
    it('não deve tentar registrar se as credenciais não são válidas', fakeAsync(() => {
      spyOn(component, 'validarCredenciais').and.returnValue(false);
      component.onRegistro();
      tick();
  
      expect(component.validarCredenciais).toHaveBeenCalled();
      expect(authService.registrarUsuario).not.toHaveBeenCalled();
    }));

    //NOTE - deve registrar se as credenciais são válidas
    it('deve registrar se as credenciais são válidas', fakeAsync(() => {
      spyOn(component, 'validarCredenciais').and.returnValue(true);
      authService.registrarUsuario.and.returnValue(of({})); // Configura o espião para retornar um Observable vazio
      
      component.onRegistro();
      tick(3000);
    
      expect(component.validarCredenciais).toHaveBeenCalled();
      expect(authService.registrarUsuario).toHaveBeenCalled();
    }));
    
    //NOTE - deve exibir modal se as credenciais forem válidas
    it('deve exibir modal se as credenciais forem válidas', fakeAsync(() =>{
      spyOn(component, 'validarCredenciais').and.returnValue(true);
      spyOn(component, 'exibirMensagemModal');

      component.onRegistro();
      tick(3000);

      expect(component.validarCredenciais).toHaveBeenCalled();
      expect(authService.registrarUsuario).toHaveBeenCalled();
      expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_REGISTRO_CONCLUIDO);
    }));

    //NOTE - deve navegar para a página de login após o registro bem-sucedido
    it('deve navegar para a página de login após o registro bem-sucedido', fakeAsync(() => {
      spyOn(component, 'validarCredenciais').and.returnValue(true);
      spyOn(component, 'exibirMensagemModal');
      
    
      component.onRegistro();
      tick(3000); 
    
      expect(component.validarCredenciais).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']); 
    }));

    //NOTE - deve exibir mensagem de erro quando o email já está registrado
    it('deve exibir mensagem de erro quando o email já está registrado', fakeAsync(() => {
      spyOn(component, 'validarCredenciais').and.returnValue(true);
      const errorResponse = { status: 409 };
      authService.registrarUsuario.and.returnValue(throwError(() => errorResponse)); // Reconfigura o spy já existente
      spyOn(component, 'exibirMensagemModal');
    
      component.onRegistro();
      tick();
    
      expect(component.validarCredenciais).toHaveBeenCalled();
      expect(authService.registrarUsuario).toHaveBeenCalled();
      expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_EMAIL_JA_REGISTRADO);
    }));

    //NOTE - deve exibir mensagem de erro quando o houver um erro inesperado
    it('deve exibir mensagem de erro quando o houver um erro inesperado', fakeAsync(() =>{
      spyOn(component, 'validarCredenciais').and.returnValue(true);
      const errorResponse = { status: 403 };
      authService.registrarUsuario.and.returnValue(throwError(() => errorResponse)); // Reconfigura o spy já existente
      spyOn(component, 'exibirMensagemModal');

      component.onRegistro();
      tick();

      expect(component.validarCredenciais).toHaveBeenCalled();
      expect(authService.registrarUsuario).toHaveBeenCalled();
      expect(component.exibirMensagemModal).toHaveBeenCalledWith(RegistroComponent.MENSAGEM_INTERNAL_SERVER_ERROR);
    }));

    //NOTE - deve exibir mensagem de erro quando o houver um erro desconhecido
    it('deve exibir mensagem de erro desconhecido quando ocorrer um erro inesperado', fakeAsync(() => {
      spyOn(component, 'validarCredenciais').and.returnValue(true);
      const errorResponse = new Error('Erro inesperado');
      authService.registrarUsuario.and.returnValue(throwError(() => errorResponse)); 
      spyOn(component, 'exibirMensagemModal');
    
      component.onRegistro();
      tick();
    
      expect(component.validarCredenciais).toHaveBeenCalled();
      expect(authService.registrarUsuario).toHaveBeenCalled();
      
      expect(component.exibirMensagemModal).toHaveBeenCalledWith(`Erro desconhecido: ${errorResponse}`);
    }));
  });
  

});
