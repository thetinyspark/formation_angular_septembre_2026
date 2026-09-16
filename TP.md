# TP n°12


Transformer le CartService

- Faites en sorte que le panier soit disponible sous forme d'un signal readonly
- Faites en sorte de charger le panier avant d'atterrir sur la page CartComponent
( en passant par un resolver, n'hésitez pas à utiliser le loadingScreenService)
- Faites en sorte que les prix totaux et la TVA soient accessibles sous forme de signal


Bonus

- Faites en sorte que sur le cartService, lorsque vous ajoutez un produit, cela 
passe par un appel en POST vers une URI
- Faites en sorte que sur le cartService, les données du panier soient obtenues via
un appel à une URI aussi 

- Créez un interceptor qui intercepte ces deux appels et qui stocke/restitue les produits au sein du localStorage