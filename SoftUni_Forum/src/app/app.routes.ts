import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./features/home/home').then(c => c.Home) },
    { path: 'catalog', loadComponent: () => import('./features/catalog/catalog').then(c => c.Catalog) },
    { path: 'new', loadComponent: () => import('./features/new-theme/new-theme').then(c => c.NewTheme), canActivate: [authGuard] },
    { path: 'login', loadComponent: () => import('./features/auth/login/login').then(c => c.Login), canActivate: [guestGuard] },
    { path: 'register', loadComponent: () => import('./features/auth/register/register').then(c => c.Register), canActivate: [guestGuard] },
    { path: 'logout', loadComponent: () => import('./features/auth/logout/logout').then(c => c.Logout), canActivate: [guestGuard] },
    { path: 'profile', loadComponent: () => import('./features/profile/profile').then(c => c.Profile), canActivate: [authGuard] },
    { path: '**', loadComponent: () => import('./shared/components/not-found/not-found').then(c => c.NotFound) }
];
