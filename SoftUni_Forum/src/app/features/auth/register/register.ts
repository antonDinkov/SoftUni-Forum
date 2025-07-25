import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    imports: [RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register {
    private auth = inject(Auth);
    private router = inject(Router);
    private usernameErrorsAvailable = signal(false);

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.nonNullable.group({
            username: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            tel: ['', [Validators.required]],
            passwords: this.formBuilder.nonNullable.group({
                password: ['', [Validators.required, Validators.minLength(5)]],
                repass: ['', [Validators.required]]
            })
        }/* , { validators: this.passwordMatch } */);
    }
    /* passwordMatch(group: AbstractControl): ValidationErrors | null {
        const pass = group.get('password')?.value;
        const repass = group.get('repass')?.value;
        return pass === repass ? null : { noMatch: true };
    } */

    get username(): AbstractControl<any, any> | null {
        return this.form.get('username');
    };

    get isUsernameInvalid(): boolean {
        return !!(this.username?.invalid && (this.username.touched || this.username.dirty));
    }

    get invalidUsernameMsg(): string {
        console.log(this.username);
        const errors = this.username?.errors;

        if (errors) {
            this.usernameErrorsAvailable.set(true);
        }

        if (!this.usernameErrorsAvailable()) {
            return '';
        }

        if (errors?.['required']) {
            return 'Username is required!';
        }

        if (errors?.['minlength']) {
            return 'Username should have at least 5 characters!';
        }

        return '';
        
    }

    /* if (this.username?.errors?.['required']) {
            console.log(this.username?.errors);
            return 'Username is required!';
        }

        if (this.username?.errors?.['minlength']) {
            return 'Username should have at least 5 characters!';
        }

        return ''; */

    /* onUsernameBlur() {
        this.username?.markAsTouched();
        this.username?.updateValueAndValidity({ onlySelf: true });
    } */

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
