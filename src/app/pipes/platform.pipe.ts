import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/Product';

@Pipe({
  name: 'platform',
  standalone: true
})
export class PlatformPipe implements PipeTransform {

  transform(products: Product[], platform: string = ""): Product[] {
    if( platform === "All" || platform === ""){ // si le filtre est "All" ou vide, on retourne tous les produits.
      return products;
    }

    // ici, on filtre les produits en fonction du nom passé en paramètre.
    return products.filter (
      (currentProduct:Product)=>{
        if( currentProduct.platform.toLowerCase().includes(platform.toLowerCase())){
          return true;
        }
        else{
          return false;
        }
      }
    );
  }

}
