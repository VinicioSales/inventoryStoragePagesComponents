import { Component } from '@angular/core';

import { TemaService } from '../../services/tema.service';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/logo-parceiro-vertical-preto-1.png';
  private imgTemaEscuro: string = 'assets/img/imgogo-parceiro-vertical-branco-1.png';
  
  

  
  constructor(private temaService: TemaService) {
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
  
  
  nomeValue: string = ''; 
  emailValue: string = '';  
  senhaValue: string = '';
  confirmar_senhaValue: string = '';
  mensagemModal: string = '';
  mostrarModal: boolean = false;

  onNomeValueChanged(input_nome: string) {
    // Esta função será acionada quando o valor do input de nome mudar
    this.nomeValue = input_nome;    
    
  }

  onEmailValueChanged(input_email: string){
    this.emailValue = input_email;
  }
  
  onSenhaValueChanged(input_senha: string){
    this.senhaValue = input_senha;
  }

  
  onConfirmarSenhaValueChanged(input_confirmar_senha: string){
    this.confirmar_senhaValue = input_confirmar_senha;
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
  validarCredenciais(): boolean{
    if (!this.validarEmail(this.emailValue)){
      this.exibirMensagemModal(RegistroComponent.MENSAGEM_EMAIL_INVALIDO);
      return false;
    }

    else if (this.senhaValue != this.confirmar_senhaValue){
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
  OnRegistro(){
    const credenciaisValidadas =  this.validarCredenciais();
    if (credenciaisValidadas){
      alert('teste')
    }
  }

}
