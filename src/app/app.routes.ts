import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { notEmptyCartGuard } from './guards/not-empty-cart.guard';

const routeConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    title: 'Shop'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Shopping Cart', 
    canActivate: [notEmptyCartGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page'
  }
];

export default routeConfig;
