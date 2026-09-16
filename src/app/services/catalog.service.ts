import { inject, Injectable, signal } from "@angular/core";
import { Product } from "../model/Product";
import { environment } from "../../environments/environment";
import { firstValueFrom} from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CatalogService {


  private _platforms = signal<string[]>([]);
  private _products = signal<Product[]>([]);
  private _httpClient = inject(HttpClient);

  public products = this._products.asReadonly();
  public platforms = this._platforms.asReadonly();


  constructor() {
    this.refresh();
  }

  private _getPlatforms():string[]{
    let platforms:string[] = this.products().map((p:Product)=>p.platform);
    platforms = Array.from(new Set(platforms));
    platforms.unshift("All");
    return platforms;
  }


  public async refresh(): Promise<void> {
    try{
      // obtient les données
      const products = await firstValueFrom(this._httpClient.get<Product[]>(environment.catalogURI+"?rand="+Math.random()));
      this._products.set(products);
      this._platforms.set(this._getPlatforms());
    }
    catch(error){
      console.error(error); 
      this._products.set([]);
      this._platforms.set([]);
    }
  }
}
