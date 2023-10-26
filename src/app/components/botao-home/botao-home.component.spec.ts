import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoHomeComponent } from './botao-home.component';

describe('BotaoHomeComponent', () => {
  let component: BotaoHomeComponent;
  let fixture: ComponentFixture<BotaoHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoHomeComponent]
    });
    fixture = TestBed.createComponent(BotaoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
