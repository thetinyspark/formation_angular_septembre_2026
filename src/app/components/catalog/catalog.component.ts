import { Component, inject } from '@angular/core';
import { Product } from '../../model/Product';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogPipe } from '../../pipes/catalog.pipe';
import { ProductComponent } from '../product/product.component';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, FormsModule, CatalogPipe, ProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  private cartService:CartService = inject(CartService);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  public filterName:string = "";
  public filterPlatform:string = "All";
  public filterPriceMin:number = 0;
  public filterPriceMax:number = 100;
  public products = this._route.snapshot.data['catalog']['products'];
  public platforms = this._route.snapshot.data['catalog']['platforms'];
  
  public getFilters():any{
    return {
      name: this.filterName,
      platform: this.filterPlatform,
      priceMin: this.filterPriceMin,
      priceMax: this.filterPriceMax
    }
  }

  public addToCart(product:Product|null):void{
    if(product !== null){
      this.cartService.addToCart(product);
    }
  }
}
