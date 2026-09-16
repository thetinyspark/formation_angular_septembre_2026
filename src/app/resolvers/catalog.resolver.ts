import { inject, Signal } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../model/Product';
import { CatalogService } from '../services/catalog.service';

export const catalogResolver: ResolveFn<{
  products: Signal<Product[]>,
  platforms: Signal<string[]>
}> = async (route, state) => {

  const service = inject(CatalogService);
  await service.refresh();

  return {
    products: service.products,
    platforms: service.platforms,
  };
};
