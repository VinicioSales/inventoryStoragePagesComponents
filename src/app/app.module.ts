import { NgModule  } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InputComponent } from './components/input/input.component';
import { BotaoComponent } from './components/botao/botao.component';
import { BotaoSairComponent } from './components/botao-sair/botao-sair.component';
import { BotaoTemaComponent } from './components/botao-tema/botao-tema.component';
import { BotaoEditarComponent } from './components/botao-editar/botao-editar.component';
import { BotaoHomeComponent } from './components/botao-home/botao-home.component';
import { BotaoRemoverComponent } from './components/botao-remover/botao-remover.component';
import { BotaoAjudaComponent } from './components/botao-ajuda/botao-ajuda.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';
import { InputContadorComponent } from './components/input-contador/input-contador.component';
import { InputPesquisarComponent } from './components/input-pesquisar/input-pesquisar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    InputComponent,
    BotaoComponent,
    BotaoSairComponent,
    BotaoTemaComponent,
    BotaoEditarComponent,
    BotaoHomeComponent,
    BotaoRemoverComponent,
    BotaoAjudaComponent,
    InputDropdownComponent,
    InputContadorComponent,
    InputPesquisarComponent,
  ],
  imports: [
    FormsModule ,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
