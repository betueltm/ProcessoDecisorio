import { TestBed } from '@angular/core/testing';

import { PedidoprodutoService } from './pedidoproduto.service';

describe('PedidoprodutoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidoprodutoService = TestBed.get(PedidoprodutoService);
    expect(service).toBeTruthy();
  });
});
