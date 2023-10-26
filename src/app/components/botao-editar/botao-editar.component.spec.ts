import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoEditarComponent } from './botao-editar.component';

describe('BotaoEditarComponent', () => {
  let component: BotaoEditarComponent;
  let fixture: ComponentFixture<BotaoEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoEditarComponent]
    });
    fixture = TestBed.createComponent(BotaoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
