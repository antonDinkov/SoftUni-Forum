import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const isLoggedIn = auth.isLoggedIn();
    const router = inject(Router);

    if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
    }
    return true;
};
