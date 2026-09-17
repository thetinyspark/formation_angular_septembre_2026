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

  [
    {filter: "Deluxe", expectedValue: 1},
    {filter: "M", expectedValue: 3},
    {filter: "ma", expectedValue: 2},
    {filter: "Ma", expectedValue: 2},
    {filter: "Te", expectedValue: 2},
    {filter: "Te", expectedValue: 2},
  ].forEach( 
    (dataTest)=>{

      it('should display all products filtered by their name', () => {
        component.filterName = dataTest.filter;
        fixture.detectChanges();
        const productNames = Array.from(fixture.nativeElement.querySelectorAll(".product h3"));
        const names = productNames.map( (element:any)=>element.innerHTML );
        expect(names.length).toEqual(dataTest.expectedValue);
      });
    }
  );

  [
    {min: 0, max: 100, expectedValue: 6},
    {min: 0, max: 10, expectedValue: 1},
    {min: 20, max: 23, expectedValue: 0},
  ].forEach( 
    (dataTest)=>{

      it('should display all products filtered by their price', () => {
        component.filterPriceMin = dataTest.min;
        component.filterPriceMax = dataTest.max;
        fixture.detectChanges();
        const productNames = Array.from(fixture.nativeElement.querySelectorAll(".product h3"));
        const names = productNames.map( (element:any)=>element.innerHTML );
        expect(names.length).toEqual(dataTest.expectedValue);
      });
    }
  );

  it('should display all products if platform is All', () => {
    component.filterPlatform = "All"; 
    fixture.detectChanges();
    const productNames = Array.from(fixture.nativeElement.querySelectorAll(".product h3"));
    const names = productNames.map( (element:any)=>element.innerHTML );
    const expected = CATALOG_MOCK.map( p=>p.name);
    expect(names).toEqual(expected);
  });

  it('should display all products of a specific platform', () => {
    component.productDetailed = true;
    component.filterPlatform = CATALOG_MOCK[0].platform; 
    fixture.detectChanges();
    const productPlatforms = Array.from(fixture.nativeElement.querySelectorAll(".product .platform"));
    const platforms = productPlatforms.map( (element:any)=>element.innerHTML );
    
    platforms.forEach( 
      (currentPlatform)=>{
        expect(currentPlatform).toEqual("Platform: "+CATALOG_MOCK[0].platform);
      }
    );
  });
});
