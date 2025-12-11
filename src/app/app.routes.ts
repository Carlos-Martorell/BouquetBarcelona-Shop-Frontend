import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { authGuard, guestGuard } from './auth';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./auth/pages/login/login').then((m) => m.Login),
    title: 'Iniciar Sesión',
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./auth/pages/register/register').then((m) => m.Register),
    title: 'Registrarse',
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'catalog',
        loadComponent: () =>
          import('./catalog/pages/catalog-list/catalog-list').then((m) => m.CatalogList),
        title: 'Catálogo Principal',
      },
      {
        path: 'catalog/:id',
        loadComponent: () =>
          import('./catalog/pages/product-detail/product-detail').then((m) => m.ProductDetail),
        title: 'Detalle del Producto',
        data: { prerender: false },
      },
      {
        path: 'cart',
        loadComponent: () => import('./cart/page/cart/cart').then((m) => m.Cart),
        title: 'Cesta de Productos',
      },
      {
        path: 'checkout',
        loadComponent: () => import('./checkout/pages/checkout/checkout').then((m) => m.Checkout),
        title: 'Checkout',
      },
      {
        path: 'success',
        loadComponent: () => import('./checkout/pages/success/success').then((m) => m.Success),
        title: 'Pago exitoso',
      },
      {
        path: 'orders',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./orders/pages/orders-list/orders-list').then((m) => m.OrdersList),
        title: 'Mis pedidos',
      },
      {
        path: '**',
        redirectTo: 'catalog',
      },
    ],
  },
];
