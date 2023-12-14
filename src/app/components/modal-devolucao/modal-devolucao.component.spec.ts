import { Router } from '@angular/router';
import { BotaoComponent } from '../botao/botao.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalDevolucaoComponent } from './modal-devolucao.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BotaoAjudaComponent } from '../botao-ajuda/botao-ajuda.component';
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';
import { MockServiceProdutosService } from 'src/app/mock/mock-service-produtos.service';

fdescribe('ModalDevolucaoComponent', () => {
  let component: ModalDevolucaoComponent;
  let fixture: ComponentFixture<ModalDevolucaoComponent>;
  let mockServiceProdutosService: MockServiceProdutosService;
  let requisicoesService: RequisicoesService;
  let modalService: ModalService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BotaoComponent,
        BotaoAjudaComponent,
        ModalDevolucaoComponent
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [RequisicoesService, ModalService, MockServiceProdutosService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDevolucaoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();

    mockServiceProdutosService = TestBed.inject(MockServiceProdutosService);
    requisicoesService = TestBed.inject(RequisicoesService);
    modalService = TestBed.inject(ModalService);
  });

  //SECTION - home
  describe('home', () => {
    //NOTE - deve navegar para "/home" quando o método home é chamado
    it('deve navegar para "/home" quando o método home é chamado', () => {
      spyOn(router, 'navigate');
      component.home();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    //NOTE - deve tratar erros quando a navegação falha
    it('deve tratar erros quando a navegação falha', () => {
      spyOn(router, 'navigate').and.throwError('Erro de Navegação');
      spyOn(console, 'error');
      component.home();
      expect(console.error).toHaveBeenCalledWith('Erro ao navegar para home', jasmine.any(Error));
    });
  });
  //!SECTION
});
