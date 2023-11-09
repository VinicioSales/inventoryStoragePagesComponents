import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Fornece um ambiente de teste para HttpClient
        RouterTestingModule // Fornece um ambiente de teste para o Router
      ],
      providers: [
        AuthGuard,
        AuthService // Garante que o AuthService está disponível para o AuthGuard
      ]
    });
    
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Adicione seus testes aqui
});
