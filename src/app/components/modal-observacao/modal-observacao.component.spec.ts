import { FormsModule } from '@angular/forms';
import { BotaoComponent } from '../botao/botao.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalObservacaoComponent } from './modal-observacao.component';

describe('ModalObservacaoComponent', () => {
  let component: ModalObservacaoComponent;
  let fixture: ComponentFixture<ModalObservacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BotaoComponent,
        ModalObservacaoComponent
      ],
      imports: [
        FormsModule,
      ]
    });
    fixture = TestBed.createComponent(ModalObservacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir o evento fecharModal quando o método onClick for chamado', () => {
    spyOn(component.fecharModal, 'emit');
    
    component.onClick();

    expect(component.fecharModal.emit).toHaveBeenCalled();
  });

  it('deve emitir o evento adicionarObservacao com o textoObservacao quando o método onAdicionar for chamado', () => {
    spyOn(component.adicionarObservacao, 'emit');
    component.textoObservacao = 'Observação de teste';
    
    component.onAdicionar();

    expect(component.adicionarObservacao.emit).toHaveBeenCalledWith('Observação de teste');
  });
});
