import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBackend } from 'src/app/services/static'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  //NOTE - login
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${urlBackend}/login`, { email, senha });
  }

  //NOTE recuperarSenha
  recuperarSenha(email: string): Observable<any> {
    return this.http.post(`${urlBackend}/recuperar-senha`, { email });
  }
}
