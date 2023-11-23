import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDevolucaoComponent } from './modal-devolucao.component';

describe('ModalDevolucaoComponent', () => {
  let component: ModalDevolucaoComponent;
  let fixture: ComponentFixture<ModalDevolucaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDevolucaoComponent]
    });
    fixture = TestBed.createComponent(ModalDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
