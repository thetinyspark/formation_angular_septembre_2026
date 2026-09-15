import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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

  @Output()
  public onAddToCart:EventEmitter<Product|null> = new EventEmitter<Product|null>();

  public addToCart():void{
    this.onAddToCart.emit(this.product);
  }
}
