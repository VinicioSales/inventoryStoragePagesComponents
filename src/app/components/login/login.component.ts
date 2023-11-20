import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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

  static readonly MENSAGEM_EMAIL_INVALIDO = 'Email inválido!';
  static readonly MENSAGEM_CAMPOS_VAZIOS = 'Preencha todos os campos!';
  static readonly MENSAGEM_DADOS_INVALIDOS = 'Email ou senha inválidos!'


  @Input() valorEmail?: string;
  @Input() valorSenha?: string;
  @Input() mensagemModal: string = '';
  
  carregando: boolean = false;
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
    this.carregando = true;

    this.authService.login(this.valorEmail!, this.valorSenha!).subscribe({
      next: (response) => {
        console.log('response logar');
        console.log(response);
        const  token = response.token;

        if (token) {
          localStorage.setItem('token_de_autenticacao', token);
          this.router.navigate(['/home']);
        }
        
        this.carregando = false;
      },
      
      error: (error: HttpErrorResponse) => {
        this.exibirMensagemModal(error.error.message);
        console.log(error.error.message);
        this.carregando = false;
      }
    });
  }

  //NOTE - onLogin
  onLogin() {
    const credenciaisValidadas =  this.validarCredenciais();
    if (credenciaisValidadas) {
      this.logar();
    }
  }
}
