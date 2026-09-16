import { inject, Signal } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Product } from '../model/Product';
import { CatalogService } from '../services/catalog.service';
import { LoadingScreenService } from '../services/loading-screen.service';

export const catalogResolver: ResolveFn<{
  products: Signal<Product[]>,
  platforms: Signal<string[]>
}> = async (route, state) => {

  const service = inject(CatalogService);
  const service2 = inject(LoadingScreenService);
  service2.isLoading.set(true);
  await service.refresh();
  service2.isLoading.set(false);

  return {
    products: service.products,
    platforms: service.platforms,
  };
};
