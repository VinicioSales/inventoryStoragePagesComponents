import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  private static readonly MENSAGEM_EMAIL_INVALIDO = 'Email inválido';
  private static readonly MENSAGEM_SENHA_INVALIDA = 'Senha inválida';
  private static readonly MENSAGEM_CAMPOS_VAZIOS = 'Preencha todos os campos';

  @Input() valorEmail?: string;
  @Input() valorSenha?: string;
  @Input() mensagemModal: string = '';
  
  mostrarModal: boolean = false;

  //NOTE - navegarRotaEsqueciSenha
  navegarRotaEsqueciSenha(): void {
    this.router.navigate(['/esqueci-senha']);
  }

  //NOTE - navegarRotaRegistro
  navegarRotaRegistro(): void {
    this.router.navigate(['/registro']);
  }

  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

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
  validarCredenciais(): boolean {
    if (!this.valorEmail || !this.valorSenha) {
      this.exibirMensagemModal(LoginComponent.MENSAGEM_CAMPOS_VAZIOS);
      return false;
    }
    
    if (!this.validarEmail(this.valorEmail)) {
      this.exibirMensagemModal(LoginComponent.MENSAGEM_EMAIL_INVALIDO);
      return false;
    }
    
    if (!this.validarSenha(this.valorSenha)) {
      this.exibirMensagemModal(LoginComponent.MENSAGEM_SENHA_INVALIDA);
      return false;
    }

    this.fecharMensagemModal();
    return true;
  }

  //NOTE - exibirMensagemModal
  exibirMensagemModal(mensagem: string): void {
    this.mostrarModal = true;
    this.mensagemModal = mensagem;
  }

  //NOTE - fecharMensagemModal
  fecharMensagemModal() {
    this.mostrarModal = false;
    this.mensagemModal = "";
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

  //NOTE - logar
  logar() {
    this.authService.login(this.valorEmail!, this.valorSenha!).subscribe(
      success => console.log('Login bem-sucedido', success),
      error => console.error('Erro no login', error)
    );
  }

  //NOTE - onLogin
  onLogin() {
    const credenciaisValidadas =  this.validarCredenciais();
    if (credenciaisValidadas) {
      this.logar();
    }
  }
}
