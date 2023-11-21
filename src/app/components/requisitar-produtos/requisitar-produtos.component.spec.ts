import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from 'src/app/services/modal/modal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';

import { InputComponent } from 'src/app/components/input/input.component'
import { BotaoComponent } from 'src/app/components/botao/botao.component'
import { RequisitarProdutosComponent } from './requisitar-produtos.component';
import { LogoBfComponent } from 'src/app/components/logo-bf/logo-bf.component'
import { BotaoTemaComponent } from 'src/app/components/botao-tema/botao-tema.component'
import { BotaoHomeComponent } from 'src/app/components/botao-home/botao-home.component'
import { InputContadorComponent } from 'src/app/components/input-contador/input-contador.component'
import { InputDropdownComponent } from 'src/app/components/input-dropdown/input-dropdown.component'

describe('RequisitarProdutosComponent', () => {
  let component: RequisitarProdutosComponent;
  let modalServiceMock: jasmine.SpyObj<ModalService>;
  let fixture: ComponentFixture<RequisitarProdutosComponent>;
  let requisicoesServiceMock: jasmine.SpyObj<RequisicoesService>;

  beforeEach(() => {
    requisicoesServiceMock = jasmine.createSpyObj('RequisicoesService', ['getProdutos', 'getPdf', 'criarSolicitacao']);
    modalServiceMock = jasmine.createSpyObj('ModalService', ['exibirMensagemModal']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        InputComponent,
        BotaoComponent,
        LogoBfComponent,
        BotaoTemaComponent,
        BotaoHomeComponent,
        InputDropdownComponent,
        InputContadorComponent,
        RequisitarProdutosComponent,
      ]
    });
    fixture = TestBed.createComponent(RequisitarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
