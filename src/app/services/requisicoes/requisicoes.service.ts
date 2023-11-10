import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBackend } from 'src/app/services/static'


@Injectable({
  providedIn: 'root'
})
export class RequisicoesService {

  constructor(private http: HttpClient) { }

  //NOTE getPdf
  getPdf(): Observable<any> {
    return this.http.post(`${urlBackend}/gerar-pdf`, { });
  }

  //NOTE - criarSolicitacao
  criarSolicitacao(dados: any): Observable<any> {
    return this.http.post(`${urlBackend}/solicitar`, { dados });
  }
}
