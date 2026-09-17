import { TestBed } from "@angular/core/testing";

import { CatalogService } from "./catalog.service";
import { Product } from "../model/Product";
import { Observable, of } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { CATALOG_MOCK } from "../model/mocks/PRODUCT_MOCK";

fdescribe("CatalogService", () => {

  class FakeHttpClient {
    public shouldFail:boolean = false;

    public get(url: string): Observable<Product[]> {
      // if( this.shouldFail){
      //   throw new HttpErrorResponse({})
      // }
      // else{
        return of(CATALOG_MOCK);
      // }
    }
  }

  let fakeHttp = new FakeHttpClient();
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide:HttpClient, useValue: fakeHttp}
      ]
    });
    service = TestBed.inject(CatalogService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return the catalog and platforms", async () => {

    fakeHttp.shouldFail = false;
    await service.refresh();
    expect(service.products()).toEqual(CATALOG_MOCK);
    CATALOG_MOCK.forEach( 
      (p)=>{
        expect(service.platforms()).toContain( p.platform );
      }
    );
  });

  it("should not return the catalog and platforms if http calls failed", async () => {

    // fakeHttp.shouldFail = true;
    const spy1 = spyOn(fakeHttp, "get").and.callFake(
      ()=>{
         throw new HttpErrorResponse({});
      }
    ); 

    await service.refresh();
    expect(service.products()).toEqual([]);
    expect(service.platforms()).toEqual([]);
    expect(spy1).toHaveBeenCalled();
    expect(spy1).toHaveBeenCalledTimes(1);
  });
});
