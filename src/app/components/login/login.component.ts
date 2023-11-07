import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private static readonly MENSAGEM_CAMPOS_VAZIOS = 'Preencha todos os campos';
  private static readonly MENSAGEM_EMAIL_INVALIDO = 'Email inválido';
  private static readonly MENSAGEM_SENHA_INVALIDA = 'Senha inválida';

  @Input() valorEmail?: string;
  @Input() valorSenha?: string;
  @Input() mensagemModal: string = '';
  
  mostrarModal: boolean = false;

  //NOTE - validarEmail
  validarEmail(email: any): boolean {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email);
  }

  //NOTE - validarSenha
  validarSenha(senha: any): boolean {
    return senha.length >= 8;
  }

  //NOTE - validarCredenciais
  validarCredenciais(): void {
    if (!this.valorEmail || !this.valorSenha) {
      this.exibirMensagemModal(LoginComponent.MENSAGEM_CAMPOS_VAZIOS);
      return;
    }
    
    if (!this.validarEmail(this.valorEmail)) {
      this.exibirMensagemModal(LoginComponent.MENSAGEM_EMAIL_INVALIDO);
      return;
    }
    
    if (!this.validarSenha(this.valorSenha)) {
      this.exibirMensagemModal(LoginComponent.MENSAGEM_SENHA_INVALIDA);
      return;
    }

    this.mostrarModal = false;
    this.mensagemModal = "";
  }

  //NOTE - exibirMensagemModal
  exibirMensagemModal(mensagem: string): void {
    this.mostrarModal = true;
    this.mensagemModal = mensagem;
  }

  //NOTE - onValorInputChange
  onValorInputChange(novoValor: string, inputId: string) {
    switch (inputId) {
      case 'inputEmail':
        this.valorEmail = novoValor;
        break;
        
      case 'inputSenha':
        this.valorSenha = novoValor;
        break;
    }
  }

  //NOTE - onLogin
  onLogin() {
    this.validarCredenciais();
  }

  handleFecharModal() {
    this.mostrarModal = false;
  }
}
