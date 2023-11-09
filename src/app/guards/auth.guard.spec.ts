import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  // SECTION - canActivate
  describe('canActivate', () => {
    
    // NOTE - deve permitir a ativação da rota quando o usuário está logado
    it('deve permitir a ativação da rota quando o usuário está logado', () => {
      authService.isLoggedIn.and.returnValue(true);
      const result = authGuard.canActivate();
      expect(result).toBeTrue();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    // NOTE - deve redirecionar para login quando o usuário não está logado
    it('deve redirecionar para login quando o usuário não está logado', () => {
      authService.isLoggedIn.and.returnValue(false);
      const result = authGuard.canActivate();
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

  });

});
