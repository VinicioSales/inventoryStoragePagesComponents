import { NgModule  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InputComponent } from './components/input/input.component';
import { BotaoComponent } from './components/botao/botao.component';
import { LoginComponent } from './components/login/login.component';
import { LogoBfComponent } from './components/logo-bf/logo-bf.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BotaoSairComponent } from './components/botao-sair/botao-sair.component';
import { BotaoTemaComponent } from './components/botao-tema/botao-tema.component';
import { BotaoHomeComponent } from './components/botao-home/botao-home.component';
import { BotaoAjudaComponent } from './components/botao-ajuda/botao-ajuda.component';
import { ModalGeralComponent } from './components/modal-geral/modal-geral.component';
import { BotaoEditarComponent } from './components/botao-editar/botao-editar.component';
import { BotaoRemoverComponent } from './components/botao-remover/botao-remover.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';
import { InputContadorComponent } from './components/input-contador/input-contador.component';
import { InputPesquisarComponent } from './components/input-pesquisar/input-pesquisar.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { HomeComponent } from './components/home/home.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { DevolucaoProdutoComponent } from './components/devolucao-produto/devolucao-produto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalObservacaoComponent } from './components/modal-observacao/modal-observacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputComponent,
    BotaoComponent,
    LoginComponent,
    LogoBfComponent,
    RegistroComponent,
    BotaoSairComponent,
    BotaoTemaComponent,
    BotaoHomeComponent,
    BotaoAjudaComponent,
    ModalGeralComponent,
    BotaoEditarComponent,
    BotaoRemoverComponent,
    InputDropdownComponent,
    InputContadorComponent,
    InputPesquisarComponent,
    EsqueciSenhaComponent,
    RedefinirSenhaComponent,
    DevolucaoProdutoComponent,
    ModalObservacaoComponent,
    
  ],
  imports: [
    FormsModule ,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
