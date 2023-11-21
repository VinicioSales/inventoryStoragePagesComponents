import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import { urlBackend, rotaEsqueciSenha, rotaLogin } from 'src/app/services/static';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let router: Router;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //SECTION - login
  describe('login', () => {
    //NOTE - deve reotornar um Observable<any>
    it('deve reotornar um Observable<any>', () => {
      const dummyResponse = { token: '12345' };
      const email = 'test@example.com';
      const senha = '123456';

      service.login(email, senha).subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      // Ajuste a URL aqui para corresponder à usada no serviço
      const req = httpMock.expectOne(`${urlBackend}${rotaLogin}`); // ajuste para a URL correta
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username: email, password: senha }); // ajuste conforme a estrutura de dados do serviço
      req.flush(dummyResponse);
    });
});

  //!SECTION



  //SECTION - recuperarSenha
  describe('recuperarSenha', () => {

    //NOTE - deve reotornar um Observable<any>
    it('deve retornar um Observable<any>', () => {
      const dummyResponse = { message: 'Instruções de recuperação enviadas.' };
      const email = 'test@example.com';

      service.recuperarSenha(email).subscribe(response => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${urlBackend}${rotaEsqueciSenha}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email });
      req.flush(dummyResponse);
    });
  });
  //!SECTION



  //SECTION - parseJwt
  describe('parseJwt', () => {

    //NOTE - deve analisar um token valido
    it('deve analisar um token valido', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImV4cCI6MTYxNTIzOTAyMn0.abcdef';
      const expectedPayload = {
        sub: "1234567890",
        name: "John Doe",
        admin: true,
        exp: 1615239022
      };
      const result = service.parseJwt(token);
      expect(result).toEqual(expectedPayload);
    });

    //NOTE - deve retornar null para um token invalido
    it('deve retornar null para um token invalido', () => {
      const token = 'invalid.jwt.token';
      const result = service.parseJwt(token);
      expect(result).toBeNull();
    });
  });
  //!SECTION

  
  


  //SECTION - isLoggedIn
  describe('isLoggedIn', () => {
    
    //NOTE - deve retornar true para um token valido
    it('deve retornar true para um token valido', () => {
      const exp = Math.floor(Date.now() / 1000) + 1000; // expiração no futuro
      const base64Url = btoa(JSON.stringify({ exp }));
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Url}.signature`;
      spyOn(localStorage, 'getItem').and.returnValue(token);
      const isLoggedIn = service.isLoggedIn();
      expect(isLoggedIn).toBeTrue();
    });
    
    //NOTE - deve retornar false para um token expirado
    it('deve retornar false para um token expirado', () => {
      // Prepara a parte do payload com uma expiração no passado
      const pastExp = Math.floor(Date.now() / 1000) - 1000; // expiração no passado
      const expiredPayload = { sub: "1234567890", name: "John Doe", admin: true, exp: pastExp };
      const base64UrlPayload = btoa(JSON.stringify(expiredPayload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      const expiredToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64UrlPayload}.signature`;
    
      spyOn(localStorage, 'getItem').and.returnValue(expiredToken);
      const isLoggedIn = service.isLoggedIn();
      expect(isLoggedIn).toBeFalse();
    });
    
    //NOTE - deve retornar false se não tiver token
    it('deve retornar false se não tiver token', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      const isLoggedIn = service.isLoggedIn();
      expect(isLoggedIn).toBeFalse();
    });
  });
  //!SECTION




  //SECTION - logout
  describe('logout', () => {
    beforeEach(() => {
      router = TestBed.inject(Router);
      spyOn(router, 'navigate');
    });

    //NOTE - deve remover o token de autenticação do localStorage
    it('deve remover o token de autenticação do localStorage', () => {
      spyOn(localStorage, 'removeItem');
      service.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('token_de_autenticacao');
    });

    //NOTE - deve redirecionar para a página home
    it('deve redirecionar para a página login', () => {
      service.logout();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

  });
  //!SECTION

});
