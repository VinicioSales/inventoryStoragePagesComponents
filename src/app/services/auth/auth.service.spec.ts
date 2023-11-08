import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { urlBackend } from 'src/app/services/static';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
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

      const req = httpMock.expectOne(`${urlBackend}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email, senha });
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

      const req = httpMock.expectOne(`${urlBackend}/recuperar-senha`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email });
      req.flush(dummyResponse);
    });
  });
  //!SECTION
});
