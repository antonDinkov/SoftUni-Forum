import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
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
            email: ['', [Validators.required, Validators.email, this.emailValidationFn()]],
            password: ['', [Validators.required, Validators.minLength(5)]]  // ✅ поправен key
        });
    }

    emailValidationFn(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const regex = /.{6,}@gmail\.(bg|com)/g;
            const isValid = regex.test(value);
            return isValid ? null : { emailInvalid: true }
        }
    }

    get email(): AbstractControl<any, any> | null {
        return this.form.get('email');
    };
    get isEmailInvalid(): boolean {
        return !!(this.email?.invalid && (this.email?.touched || this.email?.dirty));
    };
    get invalidEmailMsg (): string {
        if (this.email?.touched && this.email?.errors?.['required']) {
            return 'Email is reqquired!'
        }

        if (this.email?.touched && this.email?.errors?.['email']) {
            return 'This is not a valid email address!'
        }

        if (this.email?.errors?.['emailInvalid']) {
            return 'Wrong email!'
        }

        return '';
    }

    get password(): AbstractControl<any, any> | null {
        return this.form.get('password');
    };
    get isPasswordInvalid(): boolean {
        return !!(this.password?.invalid && (this.password?.touched || this.password?.dirty));
    };
    get invalidPasswordMsg (): string {
        if (this.password?.touched && this.password?.errors?.['required']) {
            return 'Password is reqquired!'
        }

        if (this.password?.touched && this.password?.errors?.['minlength']) {
            return 'Password must be atleast 5 characters long!'
        }

        return '';
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