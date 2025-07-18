import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    imports: [RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    private auth = inject(Auth);
    private router = inject(Router)

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            tel: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(5)]],  // ✅ поправен key
            repass: ['', [Validators.required]]
        }, { validators: this.passwordMatch });
    }

    passwordMatch(group: FormGroup) {
        const pass = group.get('password')?.value;
        const repass = group.get('repass')?.value;
        return pass === repass ? null : { noMatch: true };
    }

    register() {
        if (this.form.invalid) return;

        const { username, email, tel, password, repass } = this.form.value;
        this.auth.register(username, email, tel, password, repass).subscribe({
            next: () => this.router.navigate(['/']),
            error: err => {
                console.error('Register failed:', err);
            }
        });
    }
}
