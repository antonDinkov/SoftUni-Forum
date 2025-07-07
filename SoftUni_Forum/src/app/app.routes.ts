import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Catalog } from './features/catalog/catalog';
import { NewTheme } from './features/new-theme/new-theme';
import { Login } from './features/login/login';
import { Register } from './features/register/register';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'catalog', component: Catalog },
    { path: 'new', component: NewTheme },
    { path: 'login', component: Login },
    { path: 'register', component: Register }
];
