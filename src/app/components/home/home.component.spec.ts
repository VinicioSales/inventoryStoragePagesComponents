import { Router } from '@angular/router';
import { urlNotion } from 'src/app/static';
import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BotaoComponent } from 'src/app/components/botao/botao.component'
import { BotaoTemaComponent } from 'src/app/components/botao-tema/botao-tema.component'
import { BotaoSairComponent } from 'src/app/components/botao-sair/botao-sair.component'

describe('HomeComponent', () => {
  let component: HomeComponent;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // ... other necessary imports and providers
      declarations: [
        HomeComponent,
        BotaoComponent,
        BotaoSairComponent,
        BotaoTemaComponent,
      ],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: { logout: jasmine.createSpy('logout') } },
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    component = TestBed.createComponent(HomeComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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





  // SECTION - onLogout
  describe('onLogout', () => {
    
    // NOTE - deve chamar logout do authService
    it('deve chamar logout do authService', () => {
      component.onLogout();
      expect(authService.logout).toHaveBeenCalled();
    });

  });




  // SECTION - navegarRotaSolicitarProdutos
  describe('navegarRotaSolicitarProdutos', () => {
    
    // NOTE - deve navegar para a rota de requisitar produtos
    it('deve navegar para a rota de requisitar produtos', () => {
      component.navegarRotaSolicitarProdutos();
      expect(router.navigate).toHaveBeenCalledWith(['/requisitar-produtos']);
    });

  });




  // SECTION - navegarRotaDevolverProdutos
  describe('navegarRotaDevolverProdutos', () => {
    
    // NOTE - deve navegar para a rota de devolver produtos
    it('deve navegar para a rota de devolver produtos', () => {
      component.navegarRotaDevolverProdutos();
      expect(router.navigate).toHaveBeenCalledWith(['/devolver-produtos']);
    });

  });




  // SECTION - onNotion
  describe('onNotion', () => {
    
    //FIXME - ADICIONAR LINK DO NOTION
    // NOTE - deve abrir a URL do Notion
    it('deve abrir a URL do Notion', () => {
      spyOn(window, 'open');
      component.onNotion();
      expect(window.open).toHaveBeenCalledWith(urlNotion, '_blanc');
    });

  });

});
