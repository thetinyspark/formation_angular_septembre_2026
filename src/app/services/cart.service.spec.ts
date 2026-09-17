import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../model/Product';
import { CATALOG_MOCK } from '../model/mocks/PRODUCT_MOCK';

fdescribe('CartService', () => {

  class FakeHttpClient{

    private _products:Product[] = [];

    public get(url:string):Observable<Product[]>{
      return of(this._products);
    }

    public post(url:string, body:any){
      this._products.push(body as Product);
      return of(this._products);
    }
  }

  let service: CartService;
  let fakeHttp = new FakeHttpClient();

  beforeEach(
    () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient, 
          useValue: fakeHttp
        }
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be empty by default ', () => {
    expect(service.cart()).toEqual([])
  });


  it('should be able to add a product to the cart ', async () => {
    
    await service.addToCart(CATALOG_MOCK[0]);
    expect(service.cart()).toEqual([CATALOG_MOCK[0]]);
  });
});

