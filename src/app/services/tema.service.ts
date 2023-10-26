import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private _temaEscuroLigado = new BehaviorSubject<boolean>(false);
  temaEscuroLigado$ = this._temaEscuroLigado.asObservable();

  toggleTema() {
    this._temaEscuroLigado.next(!this._temaEscuroLigado.value);
  }

  get temaEscuroLigado() {
    return this._temaEscuroLigado.value;
  }
}
