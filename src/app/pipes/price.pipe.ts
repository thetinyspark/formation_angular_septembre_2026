import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/Product';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {

  transform(products: Product[], priceMin: number = 0, priceMax: number = 100): Product[] {
    return products.filter (
      (currentProduct:Product)=>{
        if( currentProduct.price >= priceMin && currentProduct.price <= priceMax){
          return true;
        }
        else{
          return false;
        }
      }
    );
  }

}
