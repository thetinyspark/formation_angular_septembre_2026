import { Component } from '@angular/core';
import { Product } from '../../model/Product';
import { CATALOG_MOCK } from '../../model/mocks/PRODUCT_MOCK';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NamePipe } from '../../pipes/name.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, FormsModule, NamePipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  public filterName:string = "";
  public products:Product[] = CATALOG_MOCK;
}
