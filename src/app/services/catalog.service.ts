import { computed, effect, Injectable, Signal, signal } from "@angular/core";
import { Product } from "../model/Product";
import { environment } from "../../environments/environment";
import {Observable} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class CatalogService {

  private _price = this.getPricesSignal()
  private _tva = signal<number>(0);
  public ttc = computed<number>(
    ()=>{
      return this._price() * (1+(this._tva()/100));
    }
  );

  public tva = this._tva.asReadonly();
  // public price = this._price.asReadonly();

  constructor() {
    effect(
      ()=>{
        console.log("ttc: "+this.ttc());
      }
    )
  }

  public getPricesSignal():Signal<number>{
    return toSignal(this.getPrices()) as Signal<number>;
  }

  public getPrices(){
    return new Observable<number>( 
      (sub)=>{
        let myInterval = setInterval(
          ()=>{
            const rand = Math.round( Math.random() * 100);
            sub.next( rand );
            if( rand > 50 ){
              clearInterval(myInterval);
              sub.complete();
            }
          }, 
          1000
        );
      }
    );
  }

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

  public async run(): Promise<void> {
    // this._price.set(100);
    this._tva.set(20);
  }
}
