import { inject, Injectable, signal } from "@angular/core";
import { Product } from "../model/Product";
import { environment } from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CatalogService {


  private _products = signal<Product[]>([]);
  private _httpClient = inject(HttpClient);

  public products = this._products.asReadonly();

  constructor() {
    this.refresh();
  }

  public async refresh(): Promise<void> {
    try{
      const products = await firstValueFrom(this._httpClient.get<Product[]>(environment.catalogURI+"?rand="+Math.random()));
      this._products.set(products);
    }
    catch(error){
      console.error(error); 
      this._products.set([]);
    }

    // setTimeout( 
    //   ()=> this.refresh(), 
    //   10000
    // );
  }
}
