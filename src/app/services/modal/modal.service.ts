import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  static readonly MENSAGEM_EMAIL_INVALIDO = 'Email inválido!';
  static readonly MENSAGEM_CAMPOS_VAZIOS = 'Preencha todos os campos!';
  static readonly MENSAGEM_DATA_INVALIDA = 'Formato da data inválida!';
  static readonly MENSAGEM_NOVA_SENHA_VAZIO = 'Campo nova senha vazio';
  static readonly MENSAGEM_SENHAS_DIFERENTES = 'As senhas não conferem!';
  static readonly MENSAGEM_PRODUTO_INVALIDO = 'Produto selecionado inválido!';
  static readonly MENSAGEM_SENHA_REDEFINIDA = 'Senha redefinida com sucesso!';
  static readonly MENSAGEM_DATA_ENTREGA_VAZIO = 'Selecione a data de entrega!';
  static readonly MENSAGEM_SENHA_CURTA = 'A senha deve ter no mínimo 8 caracteres!';
  static readonly MENSAGEM_SEM_PRODUTOS_SELECIONADOS = 'Selecione algum produto primeiro!';
  static readonly MENSAGEM_CODIGO_VERIFICACAO_INVALIDO = 'Código de verificação inválido!';
  static readonly MENSAGEM_CODIGO_VERIFICACAO_VAZIO = 'Campo código de verificação vazio!';
  static readonly MENSAGEM_CONFIRMAR_NOVA_SENHA_VAZIO = 'Campo confirmar nova senha vazio!';
  static readonly MENSAGEM_ERRO_DESCONHECIDO = 'Ocorreu um erro desconehcido! Tente novamente mais tarde ou entre em contato com o suporte';
  static readonly MENSAGEM_ERRO_INTERNO = 'Ocorreu um erro inesperado, tente novamente em alguns minutos. Caso o erro persista, entre em contato com o suporte.';

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
