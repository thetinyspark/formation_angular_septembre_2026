import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { Product } from '../../model/Product';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { CATALOG_MOCK } from '../../model/mocks/PRODUCT_MOCK';

fdescribe('CatalogComponent', () => {
  class FakeCartService{
    public addToCart(product:Product):void{}
  }

  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let fakeCartService = new FakeCartService();
  let fakeRoute:any = {snapshot: {data: {catalog: {}}}};
  fakeRoute.snapshot.data.catalog.products = signal<Product[]>(CATALOG_MOCK);
  fakeRoute.snapshot.data.catalog.platforms = signal<string[]>(
    Array.from( new Set(CATALOG_MOCK.map(p=>p.platform)))
  );


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent], 
      providers: [
        {provide:CartService, useValue: fakeCartService},
        {provide:ActivatedRoute, useValue: fakeRoute},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all products', () => {
    const productNames = Array.from(fixture.nativeElement.querySelectorAll(".product h3"));
    const names = productNames.map( (element:any)=>element.innerHTML );
    const expected = CATALOG_MOCK.map( p=>p.name);
    expect(names).toEqual(expected);
  });
});
