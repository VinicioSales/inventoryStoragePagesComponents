import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalObservacaoComponent } from './modal-observacao.component';
import {BotaoComponent} from 'src/app/components/botao/botao.component';

import { FormsModule } from '@angular/forms';

fdescribe('ModalObservacaoComponent', () => {
  let component: ModalObservacaoComponent;
  let fixture: ComponentFixture<ModalObservacaoComponent>;
  let spy: jasmine.Spy;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [
        ModalObservacaoComponent,
        BotaoComponent,
        
      ]
    });
    fixture = TestBed.createComponent(ModalObservacaoComponent);
    component = fixture.componentInstance;
    spy = spyOn(component.fecharModal, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//SECTION - onClick
describe('onClick', () =>{
  //NOTE - deve emitir o event fechaModal quando chamado
  it('deve emitir o event fechaModal quando chamado', () =>{
    component.onClick();
    expect(spy).toHaveBeenCalled();
  });
});


});
