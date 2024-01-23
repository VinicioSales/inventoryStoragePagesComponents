import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CamelCaseInterceptor } from 'src/app/interceptors/camuel-case.interceptor';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { InputComponent } from './components/input/input.component';
import { BotaoComponent } from './components/botao/botao.component';
import { LoginComponent } from './components/login/login.component';
import { LogoBfComponent } from './components/logo-bf/logo-bf.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ModalPdfComponent } from './components/modal-pdf/modal-pdf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BotaoSairComponent } from './components/botao-sair/botao-sair.component';
import { BotaoTemaComponent } from './components/botao-tema/botao-tema.component';
import { BotaoHomeComponent } from './components/botao-home/botao-home.component';
import { BotaoAjudaComponent } from './components/botao-ajuda/botao-ajuda.component';
import { ModalGeralComponent } from './components/modal-geral/modal-geral.component';
import { BotaoEditarComponent } from './components/botao-editar/botao-editar.component';
import { CarregamentoComponent } from './components/carregamento/carregamento.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { BotaoRemoverComponent } from './components/botao-remover/botao-remover.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';
import { InputContadorComponent } from './components/input-contador/input-contador.component';
import { InputPesquisarComponent } from './components/input-pesquisar/input-pesquisar.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { BotaoConfirmarComponent } from './components/botao-confirmar/botao-confirmar.component';
import { RequisitarProdutosComponent } from './components/requisitar-produtos/requisitar-produtos.component';
import { ModalDevolucaoComponent } from './components/modal-devolucao/modal-devolucao.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { ModalObservacaoComponent } from './components/modal-observacao/modal-observacao.component';
import { DevolucaoProdutoComponent } from './components/devolucao-produto/devolucao-produto.component';
import { InputSenhaComponent } from './components/input-senha/input-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputComponent,
    BotaoComponent,
    LoginComponent,
    LogoBfComponent,
    ModalPdfComponent,
    RegistroComponent,
    BotaoSairComponent,
    BotaoTemaComponent,
    BotaoHomeComponent,
    BotaoAjudaComponent,
    ModalGeralComponent,
    BotaoEditarComponent,
    BotaoRemoverComponent,
    EsqueciSenhaComponent,
    InputDropdownComponent,
    InputContadorComponent,
    InputPesquisarComponent,
    RedefinirSenhaComponent,
    RequisitarProdutosComponent,
    CarregamentoComponent,
    BotaoConfirmarComponent,
    ModalDevolucaoComponent,
    ToggleComponent,
    ModalObservacaoComponent,
    DevolucaoProdutoComponent,
    ModalObservacaoComponent,
    InputSenhaComponent,
    
  ],
  imports: [
    FormsModule ,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: CamelCaseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
