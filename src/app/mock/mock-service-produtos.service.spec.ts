import { TestBed } from '@angular/core/testing';

import { MockServiceProdutosService } from './mock-service-produtos.service';

describe('MockServiceProdutosService', () => {
  let service: MockServiceProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockServiceProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
