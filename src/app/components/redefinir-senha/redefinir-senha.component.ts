import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent {
  static readonly MENSAGEM_CAMPOS_VAZIOS = 'Preencha todos os campos!';
  static readonly MENSAGEM_NOVA_SENHA_VAZIO = 'Campo nova senha vazio';
  static readonly MENSAGEM_SENHAS_DIFERENTES = 'As senhas não conferem!';
  static readonly MENSAGEM_SENHA_CURTA = 'A senha deve ter no mínimo 8 caracteres!';
  static readonly MENSAGEM_CODIGO_VERIFICACAO_VAZIO = 'Campo código de verificação vazio!';
  static readonly MENSAGEM_CONFIRMAR_NOVA_SENHA_VAZIO = 'Campo confirmar nova senha vazio!';

  @Input() mensagemModal: string = '';

  valorNovaSenha: string = '';
  mostrarModal: boolean = false;
  valorCodigoVerificacao: string = '';
  valorConfirmarNovaSenha: string = '';
  corBotao: string = 'var(--cor-botao)';


  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

  //NOTE - onValorInputChange
  onValorInputChange(novoValor: string, inputId: string) {
    switch (inputId) {
      case 'inputNovaSenha':
        this.valorNovaSenha = novoValor;
        break;
        
      case 'inputConfirmarNovaSenha':
        this.valorConfirmarNovaSenha = novoValor;
        break;
      
        case 'inputCodigoVerificacao':
        this.valorCodigoVerificacao = novoValor;
        break;
    }
  }

  //NOTE - exibirMensagemModal
  exibirMensagemModal(mensagem: string): void {
    this.mostrarModal = true;
    this.mensagemModal = mensagem;
  }

  //NOTE - validarSenha
  validarSenhas() {
    if (this.valorNovaSenha.length < 8) {
      this.exibirMensagemModal(RedefinirSenhaComponent.MENSAGEM_SENHA_CURTA);
      return false;

    } else if (this.valorNovaSenha != this.valorConfirmarNovaSenha) {
      this.exibirMensagemModal(RedefinirSenhaComponent.MENSAGEM_SENHAS_DIFERENTES);
      return false;
    }
    return true;
  }

  //NOTE - validarCampos
  validarCampos() {
    debugger;
    if (this.valorNovaSenha.trim() == '' && this.valorConfirmarNovaSenha.trim() == '' && this.valorCodigoVerificacao.trim() == '') {
      this.exibirMensagemModal(RedefinirSenhaComponent.MENSAGEM_CAMPOS_VAZIOS);
      return false;
    } else if (this.valorNovaSenha.trim() == '') {
      this.exibirMensagemModal(RedefinirSenhaComponent.MENSAGEM_NOVA_SENHA_VAZIO);
      return false;

    } else if (this.valorConfirmarNovaSenha.trim() == '') {
      this.exibirMensagemModal(RedefinirSenhaComponent.MENSAGEM_CONFIRMAR_NOVA_SENHA_VAZIO);
      return false;

    } else if (this.valorCodigoVerificacao.trim() == '') {
      this.exibirMensagemModal(RedefinirSenhaComponent.MENSAGEM_CODIGO_VERIFICACAO_VAZIO);
      return false;
    }

    return true;
  }

  //NOTE - validar
  validar(funcoes: Array<() => boolean>): boolean {
    return funcoes.every(func => func());
  }

  //NOTE - onRedefinirSenha
  onRedefinirSenha() {
    const validado = this.validar([
      () => this.validarSenhas(),
      () => this.validarCampos()
    ]);
    if (validado) {
      console.log('ok');
    } else {
      console.log("Not ok");
    }
  }
}
