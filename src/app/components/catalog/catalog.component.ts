import { Component } from '@angular/core';
import { Product } from '../../model/Product';
import { CATALOG_MOCK } from '../../model/mocks/PRODUCT_MOCK';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogPipe } from '../../pipes/catalog.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, FormsModule, CatalogPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  public filterName:string = "";
  public filterPlatform:string = "All";
  public filterPriceMin:number = 0;
  public filterPriceMax:number = 100;
  public products:Product[] = CATALOG_MOCK;


  public getPlatforms():string[]{
    let platforms:string[] = this.products.map((p:Product)=>p.platform);
    platforms = Array.from(new Set(platforms));
    platforms.unshift("All");
    return platforms;
  }

  public getFilters():any{
    return {
      name: this.filterName,
      platform: this.filterPlatform,
      priceMin: this.filterPriceMin,
      priceMax: this.filterPriceMax
    }
  }
}
