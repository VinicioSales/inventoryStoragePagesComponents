import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBackend } from 'src/app/services/static'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private autenticado = false;


  //NOTE - login
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${urlBackend}/login`, { email, senha });
  }

  //NOTE recuperarSenha
  recuperarSenha(email: string): Observable<any> {
    return this.http.post(`${urlBackend}/recuperar-senha`, { email });
  }

  //NOTE - logar
  logar() {
    this.autenticado = true;
    localStorage.setItem('autenticado', 'true'); // Armazene a autenticação no localStorage
  }

  // NOTE logout
  logout() {
    this.autenticado = false;
    localStorage.removeItem('autenticado'); // Remova a autenticação do sessionStorage
  }

  //NOTE - checarAutenticacao
  checarAutenticacao(): boolean {
    if (sessionStorage.getItem('autenticado')) {
      return true;
    }
    return this.autenticado;
  }
}
