import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBackend } from 'src/app/services/static'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  //NOTE - parseJwt
  parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
  
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }
  

  //NOTE - login
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${urlBackend}/login`, { email, senha });
  }

  //NOTE - isLoggedIn
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token_de_autenticacao');
    if (token) {
      const decoded = this.parseJwt(token);
      return decoded && decoded.exp > Date.now() / 1000;
    }
    return false;
  }

  //NOTE - logout
  logout(): void {
    localStorage.removeItem('token_de_autenticacao');
    this.router.navigate(['/login']);
  }

  //NOTE recuperarSenha
  recuperarSenha(email: string): Observable<any> {
    return this.http.post(`${urlBackend}/recuperar-senha`, { email });
  }

  //NOTE - redefinirSenha
  redefinirSenha(novaSenha: string, codigoVerificacao: string): Observable<any> {
    return this.http.post(`${urlBackend}/redefinir-senha`, { novaSenha, codigoVerificacao });
  }

}
