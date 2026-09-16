import { Component, inject } from '@angular/core';
import { Product } from '../../model/Product';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogPipe } from '../../pipes/catalog.pipe';
import { ProductComponent } from '../product/product.component';
import { CatalogService } from '../../services/catalog.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, FormsModule, CatalogPipe, ProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  public filterName:string = "";
  public filterPlatform:string = "All";
  public filterPriceMin:number = 0;
  public filterPriceMax:number = 100;
  private catalogService:CatalogService = inject(CatalogService);
  private cartService:CartService = inject(CartService);
  public products = this.catalogService.products;
  public platforms = this.catalogService.platforms;


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

  public ngOnInit():void{
    this.catalogService.refresh();
  }
}
