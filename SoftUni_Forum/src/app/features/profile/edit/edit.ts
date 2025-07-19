import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { User } from '../../../models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-edit',
    imports: [RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './edit.html',
    styleUrl: './edit.css'
})
export class Edit implements OnInit {
    private auth = inject(Auth)
    readonly currentUser = this.auth.user;

    private router = inject(Router);

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            telPrefix: ['+359'],
            tel: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        const user = this.currentUser();
        if (user) {
            this.form.patchValue({
                username: user.username,
                email: user.email,
                tel: user.tel || ''
            });
        }
    }

    update() {
        if (this.form.invalid) return;

        const { username, email, tel } = this.form.value;
        console.log(username, email, tel);
        
        this.auth.update(tel, username, email).subscribe({
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
