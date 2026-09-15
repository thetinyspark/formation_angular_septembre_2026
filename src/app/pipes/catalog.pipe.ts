import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/Product';
import { NamePipe } from './name.pipe';
import { PlatformPipe } from './platform.pipe';
import { PricePipe } from './price.pipe';

@Pipe({
  name: 'catalog',
  standalone: true
})
export class CatalogPipe implements PipeTransform {

  transform(products: Product[], filters:any): Product[] {
    const namePipe = new NamePipe();
    const platformPipe = new PlatformPipe();
    const pricePipe = new PricePipe();

    let filteredProducts:Product[] = products;
    filteredProducts = namePipe.transform(filteredProducts, filters.name);
    filteredProducts = platformPipe.transform(filteredProducts, filters.platform);
    filteredProducts = pricePipe.transform(filteredProducts,filters.priceMin, filters.priceMax );

    return filteredProducts;
  }

}
