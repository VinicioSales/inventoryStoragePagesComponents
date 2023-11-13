import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import {BotaoTemaComponent} from 'src/app/components/botao-tema/botao-tema.component';
import {LogoBfComponent} from 'src/app/components/logo-bf/logo-bf.component';
import { RegistroComponent } from './registro.component';
import {InputComponent} from 'src/app/components/input/input.component';
import {BotaoComponent} from 'src/app/components/botao/botao.component';

import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';



fdescribe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['redefinirSenha']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
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
      expect(component.confirmar_senhaValue).toBe('input_confirmar_senha')
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
 
});
