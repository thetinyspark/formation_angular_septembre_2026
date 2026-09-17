import { CATALOG_MOCK } from '../model/mocks/PRODUCT_MOCK';
import { PricePipe } from './price.pipe';

fdescribe('PricePipe', () => {
  it('create an instance', () => {
    const pipe = new PricePipe();
    expect(pipe).toBeTruthy();
  });


  function getTestBedPrices(num:number):{min:number,max:number}[]{
    const prices = CATALOG_MOCK.map( p=>p.price); 
    const pmin = Math.min(...prices);
    const pmax = Math.min(...prices);

    const testBed = []; 
    for( let i = 0; i < num; i++){
      const min = Math.round(pmin);
      const max = min + Math.round( Math.random() * pmax );
      testBed.push({min,max});
    }

    return testBed;
  }

  [
    { id:1, products: CATALOG_MOCK, expectedValue: 0, min: 0, max: 0 },
  ].forEach(
    (dataTest) => {
      it(`{${dataTest.id}} should filter products by their name`, () => {
        const pipe = new PricePipe();
        const filtered = pipe.transform(CATALOG_MOCK, dataTest.min, dataTest.max);
        expect(filtered.length).toEqual(dataTest.expectedValue);

      });
    },
  );

  getTestBedPrices(10).forEach(
    (prices)=>{
        it(`{${prices.min}-${prices.max}} should filter products by min and max price`, () => {
          const pipe = new PricePipe();
          const filtered = pipe.transform(CATALOG_MOCK, prices.min, prices.max);
          expect(filtered).toBeTruthy();
          filtered.forEach( 
            (product)=>{
              expect(product.price).toBeLessThanOrEqual(prices.max);
              expect(product.price).toBeGreaterThanOrEqual(prices.min);
            }
          );
        });
    }
  )
});
