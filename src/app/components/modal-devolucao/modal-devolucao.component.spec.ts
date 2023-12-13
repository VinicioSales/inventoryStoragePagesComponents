import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalDevolucaoComponent } from './modal-devolucao.component';
import { RequisicoesService } from '../../services/requisicoes/requisicoes.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MockServiceProdutosService } from 'src/app/mock/mock-service-produtos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModalDevolucaoComponent', () => {
  let component: ModalDevolucaoComponent;
  let fixture: ComponentFixture<ModalDevolucaoComponent>;
  let mockServiceProdutosService: MockServiceProdutosService;
  let requisicoesService: RequisicoesService;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDevolucaoComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [RequisicoesService, ModalService, MockServiceProdutosService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockServiceProdutosService = TestBed.inject(MockServiceProdutosService);
    requisicoesService = TestBed.inject(RequisicoesService);
    modalService = TestBed.inject(ModalService);
  });

  // Testes a seguir...
});
