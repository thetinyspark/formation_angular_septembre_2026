import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../model/Product';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private _cartService:CartService = inject(CartService);

  public products:Product[] = [];
  public totalHT:number = 0;
  public totalTTC:number = 0;

  public async ngOnInit():Promise<void>{
    this.products = await this._cartService.getCart();
    this.totalHT = await this._cartService.getTotalHT();
    this.totalTTC = await this._cartService.getTotalTTC();  
  }
}
