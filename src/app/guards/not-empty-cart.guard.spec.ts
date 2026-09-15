import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notEmptyCartGuard } from './not-empty-cart.guard';

describe('notEmptyCartGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notEmptyCartGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
