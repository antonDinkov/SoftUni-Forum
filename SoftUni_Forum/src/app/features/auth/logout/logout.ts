import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    imports: [],
    templateUrl: './logout.html',
    styleUrl: './logout.css'
})
export class Logout {
    private auth = inject(Auth);
    private router = inject(Router);

    constructor() {
        this.auth.logout().subscribe({
            next: () => this.router.navigate(['/']),
            error: err => console.error('Logout failed:', err)
        });
    }
}
