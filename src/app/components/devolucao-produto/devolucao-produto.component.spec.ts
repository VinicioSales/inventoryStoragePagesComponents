import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucaoProdutoComponent } from './devolucao-produto.component';

describe('DevolucaoProdutoComponent', () => {
  let component: DevolucaoProdutoComponent;
  let fixture: ComponentFixture<DevolucaoProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevolucaoProdutoComponent]
    });
    fixture = TestBed.createComponent(DevolucaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
