import { CanActivateFn } from '@angular/router';
import { CartService } from '../services/cart.service';
import { inject } from '@angular/core';

export const notEmptyCartGuard: CanActivateFn = async (route, state) => {
  const cartService = inject(CartService);
  const cart = await cartService.getCart();
  return cart.length > 0;
};
