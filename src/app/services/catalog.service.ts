import { Injectable } from "@angular/core";
import { Product } from "../model/Product";
import { CATALOG_MOCK } from "../model/mocks/PRODUCT_MOCK";
import { environment } from "../../environments/environment";
import {
  combineLatest,
  firstValueFrom,
  forkJoin,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CatalogService {
  constructor() {}

  public async getCatalog(): Promise<Product[]> {
    // on utilise cette version si on veut les données bouchonnées
    // return Promise.resolve(CATALOG_MOCK);

    // une promise est juste un objet standard qui permet de gérer l'obtention
    // d'une donnée de façon asynchrone. Elle peut être résolue avec succès, ou
    // rejetée avec une erreur.

    // dans le cas présent nous allons résoudre un tableau de produits
    // en utilisant l'API standard de Javascript à l'aide de window.fetch();
    try {
      // si dans une fonction asynchrone on utilise le mot clé await, alors
      // l'éxécution de la fonction est suspendue jusqu'à ce que la promesse soit résolue.
      const response = await window.fetch(environment.catalogURI);
      const catalog = await response.json();
      return catalog as Product[];
    } catch (error) {
      console.error("Error fetching catalog: ", error);
      return Promise.resolve([]); // retourne un tableau vide en cas d'erreur
    }
  }

  public getPrices(): Observable<number> {
    return new Observable( 
      (sub)=>{
        let myInterval = setInterval( ()=>sub.next( Math.round(Math.random() * 100)), 1000);
        return ()=>clearInterval(myInterval);
      }
    );
  }

  public getVats(): Observable<number> {
    return new Observable( 
      (sub)=>{
        let myInterval = setInterval( ()=>sub.next( Math.round(Math.random() * 10)), 1000);
        return ()=>clearInterval(myInterval);
      }
    );
  }

  public getPricesTTC(): Observable<number> {
   return combineLatest({prices:this.getPrices(), vats:this.getVats()}).pipe(
    map( 
      ( data:any)=>{
        return data.prices * (1+(data.vats/100));
      }
    )
   );
  }



  public async run(): Promise<void> {
    const subscription = this.getPricesTTC().subscribe(console.log);
    setTimeout( ()=>subscription.unsubscribe(), 5000);
  }
}
