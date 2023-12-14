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
});
