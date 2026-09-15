import { Injectable } from '@angular/core';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart:Product[] = [];
  constructor() { }

  public addToCart( product:Product):void
  {
    this._cart.push(product);
  }

  public getCart():Promise<Product[]>{
    return Promise.resolve(this._cart);
  }

  public async getTotalHT():Promise<number>{
    const products = await this.getCart();
    let total:number = 0;
    for(let product of products){
      total += product.price;
    }
    return total;
  }

  public async getTotalTTC():Promise<number>{
    const totalHT = await this.getTotalHT();
    const totalTTC = totalHT * 1.2;
    return totalTTC;
  }
}
