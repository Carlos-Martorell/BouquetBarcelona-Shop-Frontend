import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { guestGuard } from './auth';

export const routes: Routes = [
    
    {
        path: '',
        component: MainLayout,
        children: [
            // {
            //     path: '', 
            //     loadComponent: () => import('./catalog/pages/catalog-list/catalog-list').then(m => m.CatalogList),
            //     title: 'Catálogo Principal',
            // },
            ]
    },
{
        path: 'login', 
        canActivate: [guestGuard],
        loadComponent: () => import('./auth/pages/login/login').then(m => m.Login),
        title: 'Iniciar Sesión',
    },
    {
        path: 'register', 
        canActivate: [guestGuard],
        loadComponent: () => import('./auth/pages/register/register').then(m => m.Register),
        title: 'Registrarse',
    },
    {
    path: '**',
    redirectTo: '', 
    }

];
