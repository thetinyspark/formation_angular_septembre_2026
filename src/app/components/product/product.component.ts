import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../model/Product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input()
  public product:Product|null = null;

  @Input()
  public detailed:boolean = false;
}
