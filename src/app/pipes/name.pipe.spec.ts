
import { CATALOG_MOCK } from "../model/mocks/PRODUCT_MOCK";
import { NamePipe } from "./name.pipe";

fdescribe("NamePipe Test suite", () => {

  var pipe:NamePipe = new NamePipe();

  beforeEach( 
    ()=>{
       pipe = new NamePipe();
    }
  );


  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  [
    { id:1, products: CATALOG_MOCK, expectedValue: 0, filter: "_" },
    { id:2, products: CATALOG_MOCK, expectedValue: 2, filter: "Tetris" },
    { id:3, products: CATALOG_MOCK, expectedValue: 3, filter: "M" },
    { id:4, products: CATALOG_MOCK, expectedValue: 3, filter: "m" },
    { id:5, products: CATALOG_MOCK, expectedValue: CATALOG_MOCK.length, filter: "" }
  ].forEach(
    (dataTest) => {


      it("should filter products by their name, id="+dataTest.id, () => {
        const filtered = pipe.transform(dataTest.products, dataTest.filter);
        expect(filtered.length).toEqual(dataTest.expectedValue);
      });


    },
  );
});
