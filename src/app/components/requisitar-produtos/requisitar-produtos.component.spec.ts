import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitarProdutosComponent } from './requisitar-produtos.component';

describe('RequisitarProdutosComponent', () => {
  let component: RequisitarProdutosComponent;
  let fixture: ComponentFixture<RequisitarProdutosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequisitarProdutosComponent]
    });
    fixture = TestBed.createComponent(RequisitarProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
