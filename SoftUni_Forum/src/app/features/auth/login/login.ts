import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    private auth = inject(Auth);
    private router = inject(Router)

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]]  // ✅ поправен key
        });
    }

    login() {
        if (this.form.invalid) return;

        const { email, password } = this.form.value;
        this.auth.login(email, password).subscribe({
            next: () => this.router.navigate(['/']),
            error: err => {
                console.error('Login failed:', err);
            }
        });
    }
}