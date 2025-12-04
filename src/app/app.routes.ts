import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            // {
            //     path:'',
            //     loadComponent: () => import('./catalog/pages/catalog-list/catalog-list').then(m => m.CatalogList),
            // }
        ]
    }

];
