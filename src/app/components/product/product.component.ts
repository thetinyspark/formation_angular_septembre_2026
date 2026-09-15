import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../model/Product';
import { CartService } from '../../services/cart.service';

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

  private _cartService:CartService = inject(CartService);

  public addToCart():void{
    this._cartService.addToCart(this.product!);
  }
}
