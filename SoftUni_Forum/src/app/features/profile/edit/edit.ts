import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './edit.html',
    styleUrl: './edit.css'
})
export class Edit implements OnInit {
    private auth = inject(Auth)
    readonly currentUser = this.auth.user;

    username: string = '';
    email: string = '';
    tel: string = '';
    telPrefix: string = '+359';

    private router = inject(Router);


    ngOnInit() {
        const user = this.currentUser();
        if (user) {
            this.username = user.username;
            this.email = user.email;
            this.tel = user.tel;
        }
    }

    update() {
        if (!this.username || !this.email || !this.tel) return;

        
        
        this.auth.update(this.tel, this.username, this.email).subscribe({
            next: () => this.router.navigate(['/profile']),
            error: err => {
                console.error('Update failed:', err);
            }
        });
    }

    cancel() {
        this.router.navigate(['/profile']);
    }
}
