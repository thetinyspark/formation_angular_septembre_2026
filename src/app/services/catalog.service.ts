import { Injectable } from '@angular/core';
import { Product } from '../model/Product';
import { CATALOG_MOCK } from '../model/mocks/PRODUCT_MOCK';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root', 
})
export class CatalogService {

  constructor() { }

  public async getCatalog():Promise<Product[]>{
    // on utilise cette version si on veut les données bouchonnées
    // return Promise.resolve(CATALOG_MOCK);
    
    // une promise est juste un objet standard qui permet de gérer l'obtention 
    // d'une donnée de façon asynchrone. Elle peut être résolue avec succès, ou 
    // rejetée avec une erreur.

    // dans le cas présent nous allons résoudre un tableau de produits 
    // en utilisant l'API standard de Javascript à l'aide de window.fetch();
    try{
      // si dans une fonction asynchrone on utilise le mot clé await, alors 
      // l'éxécution de la fonction est suspendue jusqu'à ce que la promesse soit résolue.
      const response = await window.fetch(environment.catalogURI);
      const catalog = await response.json();
      return catalog as Product[];
    }
    catch(error){
      console.error("Error fetching catalog: ", error);
      return Promise.resolve([]); // retourne un tableau vide en cas d'erreur
    }
    
  }

  public getVAT():Promise<number>{
    return Promise.resolve(20);
  }

  public async run():Promise<void>{
    const prom1 = new Promise<number>(
      (resolve, reject)=>{
        setTimeout( 
          ()=>{
            const randomValue =  Math.round( Math.random() * 100 );
            resolve(randomValue);
          }, 
          1000
        );
      }
    );


    const price = await prom1;
    const vat = await this.getVAT();
    console.log("Price: ", price);
    console.log("VAT: ", vat, 1+(vat / 100));
    console.log("Total: ", (price * (1+(vat / 100))));
  }
}
