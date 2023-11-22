import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private _temaEscuroLigado = new BehaviorSubject<boolean>(this.getTemaInicial());
  temaEscuroLigado$ = this._temaEscuroLigado.asObservable();


  constructor() {}

  //NOTE - toggleTema
  toggleTema() {
    const novoEstado = !this._temaEscuroLigado.value;
    this._temaEscuroLigado.next(novoEstado);
    localStorage.setItem('temaEscuroLigado', novoEstado.toString());
  }

  //NOTE - temaEscuroLigado
  get temaEscuroLigado() {
    return this._temaEscuroLigado.value;
  }

  //NOTE - getTemaInicial
  getTemaInicial(): boolean {
    const temaSalvo = localStorage.getItem('temaEscuroLigado');
    return temaSalvo ? temaSalvo === 'true' : false;
  }

}
