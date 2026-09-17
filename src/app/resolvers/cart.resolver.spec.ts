import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cartResolver } from './cart.resolver';
import { Product } from '../model/Product';
import { Signal } from '@angular/core';

describe('cartResolver', () => {
  const executeResolver: ResolveFn<{
    cart: Signal<Product[]>;
    totalHT: Signal<number>;
    totalTTC: Signal<number>;
  }> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cartResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
