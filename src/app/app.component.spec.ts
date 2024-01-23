import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputComponent } from 'src/app/components/input/input.component';
import { BotaoComponent } from 'src/app/components/botao/botao.component';
import { ModalPdfComponent } from 'src/app/components/modal-pdf/modal-pdf.component';
import { BotaoSairComponent } from 'src/app/components/botao-sair/botao-sair.component';
import { BotaoHomeComponent } from 'src/app/components/botao-home/botao-home.component';
import { BotaoTemaComponent } from 'src/app/components/botao-tema/botao-tema.component';
import { ModalGeralComponent } from 'src/app/components/modal-geral/modal-geral.component';
import { BotaoAjudaComponent } from 'src/app/components/botao-ajuda/botao-ajuda.component';
import { BotaoEditarComponent } from 'src/app/components/botao-editar/botao-editar.component';
import { BotaoRemoverComponent } from 'src/app/components/botao-remover/botao-remover.component';
import { InputDropdownComponent } from 'src/app/components/input-dropdown/input-dropdown.component';
import { InputContadorComponent } from 'src/app/components/input-contador/input-contador.component';
import { ModalDevolucaoComponent } from 'src/app/components/modal-devolucao/modal-devolucao.component';
import { InputPesquisarComponent } from 'src/app/components/input-pesquisar/input-pesquisar.component';


describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      FormsModule,
      RouterTestingModule,
      HttpClientTestingModule,
    ],
    declarations: [
      AppComponent,
      InputComponent,
      BotaoComponent,
      ModalPdfComponent,
      BotaoSairComponent,
      BotaoHomeComponent,
      BotaoTemaComponent,
      BotaoAjudaComponent,
      ModalGeralComponent,
      BotaoEditarComponent,
      BotaoRemoverComponent,
      InputDropdownComponent,
      InputContadorComponent,
      InputPesquisarComponent,
      ModalDevolucaoComponent,
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'inventory-storage'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('inventory-storage');
  });
  
});
