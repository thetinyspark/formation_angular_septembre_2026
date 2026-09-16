import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { Product } from '../model/Product';

export const cartInterceptor: HttpInterceptorFn = (req, next) => {

  // L'intérêt d'un interceptor peut être double
  // Soit on l'utilise comme un "enrichisseur de requêtes" 
  // par exemple, si on souhaite enrichir les en-têtes de chaque requête HTTP
  // et bien on peut utiliser un interceptor pour le faire, plutôt que de dupliquer du code


  // Ici, on utilise l'interceptor dans un autre but. 
  // L'utilisation qui en est faite ici, permet de simuler le fonctionnement 
  // du serveur back-end. Le but étant que le code de simulation du back-end 
  // se trouve dans un intercepteur qui désactivable en un commentaire dans le app.config
  // Résultat, nos services peuvent être bien codés dans leur version définitive tout de suite
  // sans avoir de code conditionnel nécessaire à la simulation du retour du serveur.

    if (req.method === "GET" && req.url.includes(environment.cartURI)) {
        const products = JSON.parse( localStorage.getItem("cart") || '[]');
        return of(
          new HttpResponse({
            status: 200,
            body: products,
          })
        );
    }

    if (req.method === "POST" && req.url.includes(environment.cartURI)) {
        const products = JSON.parse( localStorage.getItem("cart") || '[]') as Product[];
        const userProduct = req.body as Product;
        products.push(userProduct); 
        localStorage.setItem("cart", JSON.stringify(products));

        return of(
          new HttpResponse({
            status: 200,
            body: null,
          })
        );
    }

  return next(req);
};
