import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InputComponent } from './components/input/input.component';
import { BotaoComponent } from './components/botao/botao.component';
import { BotaoSairComponent } from './components/botao-sair/botao-sair.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    InputComponent,
    BotaoComponent,
    BotaoSairComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
