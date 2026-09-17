import { CATALOG_MOCK } from '../model/mocks/PRODUCT_MOCK';
import { PlatformPipe } from './platform.pipe';

fdescribe('PlatformPipe', () => {

  
  function getPlatforms(){
      return Array.from( new Set(CATALOG_MOCK.map(p=>p.platform)));
  }

  it('create an instance', () => {
    const pipe = new PlatformPipe();
    expect(pipe).toBeTruthy();
  });

  it('should not filter products if platform equals = ""', () => {
    const pipe = new PlatformPipe();
    const filtered = pipe.transform(CATALOG_MOCK, ""); 
    expect( filtered).toEqual(CATALOG_MOCK);
  });

  it('should not filter products if platform equals = "All"', () => {
    const pipe = new PlatformPipe();
    const filtered = pipe.transform(CATALOG_MOCK, "All"); 
    expect( filtered).toEqual(CATALOG_MOCK);
  });



  getPlatforms().forEach(
    (currentPlatform) => {
      it(`{${currentPlatform}} should filter products by their platform`, () => {
        const pipe = new PlatformPipe();
        const filtered = pipe.transform(CATALOG_MOCK, currentPlatform);
        filtered.forEach( 
          (product)=>{
            expect(product.platform).toEqual(currentPlatform);
          }
        );
      });
    },
  );

  getPlatforms().map( p=>p.toLowerCase()).forEach(
    (currentPlatform) => {
      it(`{${currentPlatform}} should filter products by their platform (tolowercase)`, () => {
        const pipe = new PlatformPipe();
        const filtered = pipe.transform(CATALOG_MOCK, currentPlatform);
        filtered.forEach( 
          (product)=>{
            expect(product.platform.toLowerCase()).toEqual(currentPlatform);
          }
        );
      });
    },
  );
});
