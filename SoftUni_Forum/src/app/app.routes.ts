import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/home/home').then(c => c.Home) },
    { path: 'catalog', loadComponent: () => import('./features/catalog/catalog').then(c => c.Catalog) },
    { path: 'new', loadComponent: () => import('./features/new-theme/new-theme').then(c => c.NewTheme) },
    { path: 'login', loadComponent: () => import('./features/login/login').then(c => c.Login) },
    { path: 'register', loadComponent: () => import('./features/register/register').then(c => c.Register) },
    { path: 'profile', loadComponent: () => import('./features/profile/profile').then(c => c.Profile) },
    { path: '**', loadComponent: () => import('./shared/components/not-found/not-found').then(c => c.NotFound) }
];
