import { inject, Signal } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Product } from "../model/Product";
import { CartService } from "../services/cart.service";

export const cartResolver: ResolveFn<{
  cart: Signal<Product[]>;
  totalHT: Signal<number>;
  totalTTC: Signal<number>;
}> = (route, state) => {
  const service = inject(CartService);

  return {
    cart: service.cart,
    totalHT: service.totalHT,
    totalTTC: service.totalTTC,
  };
};
