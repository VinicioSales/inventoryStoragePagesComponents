import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  static readonly MENSAGEM_EMAIL_INVALIDO = 'Email inválido!';
  static readonly MENSAGEM_CAMPOS_VAZIOS = 'Preencha todos os campos!';
  static readonly MENSAGEM_SEM_PRODUTOS_SELECIONADOS = 'Selecione algum produto primeiro!';
  
  private mostrarModalSource = new BehaviorSubject<boolean>(false);
  private mensagemModalSource = new BehaviorSubject<string>('');

  mostrarModal$ = this.mostrarModalSource.asObservable();
  mensagemModal$ = this.mensagemModalSource.asObservable();

  exibirMensagemModal(mensagem: string): void {
    this.mensagemModalSource.next(mensagem);
    this.mostrarModalSource.next(true);
  }

  fecharModal(): void {
    this.mostrarModalSource.next(false);
  }
}
