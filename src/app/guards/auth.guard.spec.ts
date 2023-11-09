// src\app\guards\auth.guard.spec.ts:
import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';

import { AuthGuard } from './auth.guard'; // Ajuste o nome aqui para 'AuthGuard'

describe('AuthGuard', () => { // Ajuste o nome aqui também
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard] // Adicione AuthGuard aos provedores
    });
    guard = TestBed.inject(AuthGuard); // Injete AuthGuard para usar nos testes
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Teste para garantir que AuthGuard é criado corretamente
  });
  
  // Aqui você pode adicionar mais testes para os casos de canActivate retornar true ou false
});
