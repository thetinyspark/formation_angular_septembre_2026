import {
  HttpInterceptorFn,
  HttpResponse,
} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { delay, map, Observable, of } from "rxjs";
import { Product } from "../model/Product";

export const catalogInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.method === "GET" && req.url.includes(environment.catalogURI)) {
    return new Observable<HttpResponse<Product[]>>((sub) => {
      window.fetch(environment.catalogURI).then((rep) => {
        rep.json().then((products: Product[]) => {
          sub.next(
            new HttpResponse({
              status: 200,
              body: products,
            }),
          );
          sub.complete();
        });
      });
    }).pipe(delay(3000)); // simule du lag réseau
  }

  return next(req);
};
