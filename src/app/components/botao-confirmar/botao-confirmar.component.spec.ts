import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoConfirmarComponent } from './botao-confirmar.component';

describe('BotaoConfirmarComponent', () => {
  let component: BotaoConfirmarComponent;
  let fixture: ComponentFixture<BotaoConfirmarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoConfirmarComponent]
    });
    fixture = TestBed.createComponent(BotaoConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
