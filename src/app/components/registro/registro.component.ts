import { Component } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/logo-parceiro-vertical-preto-1.png';
  private imgTemaEscuro: string = 'assets/img/imgogo-parceiro-vertical-branco-1.png';
  constructor(
    private router: Router,
    private authService: AuthService,
    private temaService: TemaService
  ) {
    this.atualizarImg();
    
     // Escute as mudanças do tema
     this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
      this.atualizarImg();
     });
   }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.temaService.temaEscuroLigado ? this.imgTemaEscuro : this.imgTemaClaro;
  }

  static readonly MENSAGEM_EMAIL_INVALIDO = 'Email está com formato inválido!';
  static readonly MENSAGEM_SENHAS_DIFERENTES = 'As senhas não conferem!';
  static readonly MENSAGEM_SENHA_CURTA = 'A senha deve ter no mínimo 8 caracteres!';
  static readonly MENSAGEM_FORMATO_NOME_INCORRETO = 'O nome não deve conter números';
  static readonly MENSAGEM_CAMPOS_VAZIO = 'Todos os campos são obrigatórios!';
  static readonly MENSAGEM_REGISTRO_CONCLUIDO = 'Usuário cadastrado com sucesso!';
  static readonly MENSAGEM_EMAIL_JA_REGISTRADO = 'Email já registrado';
  static readonly MENSAGEM_INTERNAL_SERVER_ERROR = 'Ocorreu um erro inesperado, tente de novo em alguns instantes. Se o erro persistir, entre em contato com o suporte.'


  
  
  
  nomeValue: string = ''; 
  emailValue: string = '';  
  senhaValue: string = '';
  confirmarSenhaValue: string = '';
  idNotion: string = '';
  mensagemModal: string = '';
  mostrarModal: boolean = false;
  mostrarSenha: boolean = false;

  handleVizualizacaoSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  onNomeValueChanged(inputNome: string) {
    // Esta função será acionada quando o valor do input de nome mudar
    this.nomeValue = inputNome;    
    
  }

  onEmailValueChanged(inputEmail: string){
    this.emailValue = inputEmail;
  }
  
  onSenhaValueChanged(inputSenha: string){
    this.senhaValue = inputSenha;
  }

  
  onConfirmarSenhaValueChanged(inputConfirmarSenha: string){
    this.confirmarSenhaValue = inputConfirmarSenha;
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

  verificarNumeroNoNome(nome: string): boolean {
    for (const caractere of nome) {
      if (!isNaN(Number(caractere))) {
        return true;
      }
    }
    return false;
  }


  
  //NOTE - validarCredenciais
  validarCredenciais(): boolean{
    if(!this.nomeValue.trim()|| !this.emailValue.trim()|| !this.senhaValue.trim() || !this.confirmarSenhaValue.trim()) {
      this.exibirMensagemModal(RegistroComponent.MENSAGEM_CAMPOS_VAZIO);
      return false;
    }


    else if (this.verificarNumeroNoNome(this.nomeValue)) {      
      this.exibirMensagemModal(RegistroComponent.MENSAGEM_FORMATO_NOME_INCORRETO);
      return false;
     }


    else if (!this.validarEmail(this.emailValue)){
      this.exibirMensagemModal(RegistroComponent.MENSAGEM_EMAIL_INVALIDO);
      return false;
    }

    else if (this.senhaValue != this.confirmarSenhaValue){
      this.exibirMensagemModal(RegistroComponent.MENSAGEM_SENHAS_DIFERENTES);
      return false;
    }

    else if (!this.validarSenha(this.senhaValue)){
      this.exibirMensagemModal(RegistroComponent.MENSAGEM_SENHA_CURTA);
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


  //NOTE - OnRegistro 
  onRegistro(){
    const credenciaisValidadas = this.validarCredenciais();
    if (credenciaisValidadas){
      
      this.authService.registrarUsuario(this.nomeValue, this.emailValue, this.senhaValue, this.idNotion).subscribe({
        next: (response) => {
          
          this.exibirMensagemModal(RegistroComponent.MENSAGEM_REGISTRO_CONCLUIDO);            
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);               
     
        },
        error: (error) => {
          if (error.status === 409) {
            this.exibirMensagemModal(RegistroComponent.MENSAGEM_EMAIL_JA_REGISTRADO);
          } else if (error.status === 403) {
            this.exibirMensagemModal(RegistroComponent.MENSAGEM_INTERNAL_SERVER_ERROR);
          }      
          else {
            this.exibirMensagemModal(`Erro desconhecido: ${error}`);
          }

        }
      });
      
    }
  }

}