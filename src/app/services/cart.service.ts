import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../model/Product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _http = inject(HttpClient);
  private _cart = signal<Product[]>([]);
  public cart = this._cart.asReadonly();
  public totalHT = computed( 
    ()=>{
      let total = 0;
      this._cart().forEach(
        (product:Product)=>{
          total += product.price;
        }
      ); 

      return total;
    }
  );

  public totalTTC = computed(
    ()=>{
      return this.totalHT() * 1.2;
    }
  );

  constructor() { }

  public addToCart( product:Product):void
  {
    this._http.post(environment.cartURI, product).subscribe(
      ()=>{
        this.refresh();
      }
    );
  }

  public async refresh():Promise<void>{
    try{
      const cart = await firstValueFrom(this._http.get<Product[]>(environment.cartURI));
      this._cart.set(cart);
    }
    catch(error){
      this._cart.set([]);
    }
  }
}
