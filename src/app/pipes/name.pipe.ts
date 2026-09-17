import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/Product';


// Les pipes en Angular, sont ce que l'on appelle des fonctions pures. 
// C'est à dire que elles ne modifient pas les données qu'elles reçoivent en entrée. 
// Elles prennent des données en entrée et retournent une valeur à la sortie. 
// Ici les pipes sont utilisés comme filtres pour nos produits.
@Pipe({
  name: 'name',
  standalone: true
})
export class NamePipe implements PipeTransform {

  transform(products: Product[], name: string = ""): Product[] {
    // ici, on filtre les produits en fonction du nom passé en paramètre.
    return products.filter (
      (currentProduct:Product)=>{
        if( currentProduct.name.toLowerCase().includes(name.toLowerCase())){
          return true;
        }
        else{
          return false;
        }
      }
    );
  }

}
