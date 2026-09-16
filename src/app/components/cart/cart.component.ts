import { Component, inject } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private _route = inject(ActivatedRoute);
  public products = this._route.snapshot.data['cart']['cart'];
  public totalHT = this._route.snapshot.data['cart']['totalHT'];
  public totalTTC = this._route.snapshot.data['cart']['totalTTC'];
}
