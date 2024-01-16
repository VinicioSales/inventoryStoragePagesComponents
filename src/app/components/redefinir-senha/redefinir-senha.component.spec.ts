import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BotaoComponent } from '../botao/botao.component';
import { InputComponent } from '../input/input.component';
import { LogoBfComponent } from '../logo-bf/logo-bf.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedefinirSenhaComponent } from './redefinir-senha.component';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';



describe('RedefinirSenhaComponent', () => {
  let component: RedefinirSenhaComponent;
  let fixture: ComponentFixture<RedefinirSenhaComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['redefinirSenha']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        BotaoComponent,
        InputComponent,
        LogoBfComponent,
        BotaoTemaComponent,
        RedefinirSenhaComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RedefinirSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });


  // SECTION - onValorInputChange
  describe('onValorInputChange', () => {
    // NOTE - deve atualizar o valorNovaSenha corretamente
    it('deve atualizar o valorNovaSenha corretamente', () => {
      component.onValorInputChange('novaSenha', 'inputNovaSenha');
      expect(component.valorNovaSenha).toBe('novaSenha');
    });

    // NOTE - deve atualizar o valorConfirmarNovaSenha corretamente
    it('deve atualizar o valorConfirmarNovaSenha corretamente', () => {
      component.onValorInputChange('confirmarSenha', 'inputConfirmarNovaSenha');
      expect(component.valorConfirmarNovaSenha).toBe('confirmarSenha');
    });

    // NOTE - deve atualizar o valorCodigoVerificacao corretamente
    it('deve atualizar o valorCodigoVerificacao corretamente', () => {
      component.onValorInputChange('codigo', 'inputCodigoVerificacao');
      expect(component.valorCodigoVerificacao).toBe('codigo');
    });
  });




  // SECTION - validarSenhas
  describe('validarSenhas', () => {
    // NOTE - deve retornar false se a senha for curta
    it('deve retornar false se a senha for curta', () => {
      component.valorNovaSenha = '123';
      component.valorConfirmarNovaSenha = '123';
      expect(component.validarSenhas()).toBeFalse();
    });

    // NOTE - deve retornar false se as senhas não conferem
    it('deve retornar false se as senhas não conferem', () => {
      component.valorNovaSenha = '12345678';
      component.valorConfirmarNovaSenha = '12345679';
      expect(component.validarSenhas()).toBeFalse();
    });

    // NOTE - deve retornar true se as senhas conferem e têm o comprimento correto
    it('deve retornar true se as senhas conferem e têm o comprimento correto', () => {
      component.valorNovaSenha = '12345678';
      component.valorConfirmarNovaSenha = '12345678';
      expect(component.validarSenhas()).toBeTrue();
    });
  });
  //!SECTION



  // SECTION - validarCampos
  describe('validarCampos', () => {
    // NOTE - deve retornar false e mostrar modal para campos vazios
    it('deve retornar false e mostrar modal para campos vazios', () => {
      component.valorNovaSenha = '';
      component.valorConfirmarNovaSenha = '';
      component.valorCodigoVerificacao = '';
      expect(component.validarCampos()).toBeFalse();
    });

    // NOTE - deve retornar false e mostrar modal se o campo nova senha estiver vazio
    it('deve retornar false e mostrar modal se o campo nova senha estiver vazio', () => {
      component.valorNovaSenha = '';
      component.valorConfirmarNovaSenha = '12345678';
      component.valorCodigoVerificacao = '123456';
      expect(component.validarCampos()).toBeFalse();
    });

    // NOTE - deve retornar false e mostrar modal se o campo confirmar nova senha estiver vazio
    it('deve retornar false e mostrar modal se o campo confirmar nova senha estiver vazio', () => {
      component.valorNovaSenha = '12345678';
      component.valorConfirmarNovaSenha = '';
      component.valorCodigoVerificacao = '123456';
      expect(component.validarCampos()).toBeFalse();
    });

    // NOTE - deve retornar false e mostrar modal se o campo código de verificação estiver vazio
    it('deve retornar false e mostrar modal se o campo código de verificação estiver vazio', () => {
      component.valorNovaSenha = '12345678';
      component.valorConfirmarNovaSenha = '12345678';
      component.valorCodigoVerificacao = '';
      expect(component.validarCampos()).toBeFalse();
    });

    // NOTE - deve retornar true se todos os campos estiverem preenchidos
    it('deve retornar true se todos os campos estiverem preenchidos', () => {
      component.valorNovaSenha = '12345678';
      component.valorConfirmarNovaSenha = '12345678';
      component.valorCodigoVerificacao = '123456';
      expect(component.validarCampos()).toBeTrue();
    });
  });
  //!SECTION




  // SECTION - onRedefinirSenha
  describe('onRedefinirSenha', () => {
    // NOTE - deve chamar authService.redefinirSenha e navegar para login quando bem-sucedido
    it('deve chamar authService.redefinirSenha e navegar para login quando bem-sucedido', () => {
      component.valorNovaSenha = '12345678';
      component.valorConfirmarNovaSenha = '12345678';
      component.valorCodigoVerificacao = '123456';
      authService.redefinirSenha.and.returnValue(of({ success: true }));

      component.onRedefinirSenha();

      expect(authService.redefinirSenha).toHaveBeenCalledWith('12345678', '123456');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    // NOTE - deve mostrar mensagem de erro adequada com base no erro recebido
    it('deve mostrar mensagem de erro adequada com base no erro recebido', () => {
      component.valorNovaSenha = '12345678';
      component.valorConfirmarNovaSenha = '12345678';
      component.valorCodigoVerificacao = '123456';
      const errorResponse = { status: 401 };
      authService.redefinirSenha.and.returnValue(throwError(() => errorResponse));

      component.onRedefinirSenha();

    });

    // NOTE - não deve chamar authService.redefinirSenha se as validações falharem
    it('não deve chamar authService.redefinirSenha se as validações falharem', () => {
      component.valorNovaSenha = '123';
      component.valorConfirmarNovaSenha = '123';
      component.valorCodigoVerificacao = '123456';
      component.onRedefinirSenha();
      expect(authService.redefinirSenha).not.toHaveBeenCalled();
    });

    // NOTE - deve exibir erro interno se a resposta do servidor for 500
    it('deve exibir erro interno se a resposta do servidor for 500', () => {
      component.valorNovaSenha = '12345678';
      component.valorConfirmarNovaSenha = '12345678';
      component.valorCodigoVerificacao = '123456';
      const errorResponse = { status: 500 };
      authService.redefinirSenha.and.returnValue(throwError(() => errorResponse));

      component.onRedefinirSenha();
    });
  });
  //!SECTION
});
