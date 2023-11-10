import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoBfComponent } from './logo-bf.component';

describe('LogoBfComponent', () => {
  let component: LogoBfComponent;
  let fixture: ComponentFixture<LogoBfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoBfComponent]
    });
    fixture = TestBed.createComponent(LogoBfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
