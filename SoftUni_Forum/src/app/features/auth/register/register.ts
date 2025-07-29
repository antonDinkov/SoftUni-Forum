import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    /* public usernameErrorsAvailable = signal(false); */

    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.nonNullable.group({
            username: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email, this.emailValidationFn()]],
            tel: ['', [Validators.required]],
            passwords: this.formBuilder.nonNullable.group({
                password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
                repass: ['', [Validators.required]]
            }, { validators: this.passwordValidationFn }),

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

    passwordValidationFn(group: AbstractControl): ValidationErrors | null {

        const pass = group.get('password');
        const repass = group.get('repass');

        if (!pass || !repass) return null;

        if (pass.value !== repass.value) {
            repass.setErrors({ passwordMissmatch: true }); // ➕ Закачаме грешка към `repass`
            return { passwordMissmatch: true };
        } else {
            // Премахваме грешката, ако вече съвпадат
            if (repass.hasError('passwordMissmatch')) {
                repass.setErrors(null);
            }
            return null;
        }
    };

    get username(): AbstractControl<any, any> | null {
        return this.form.get('username');
    };

    get isUsernameInvalid(): boolean {
        const username = this.username;
        return !!(username?.invalid && (username.dirty || username.touched));
    }

    get invalidUsernameMsg(): string {
        if (this.username?.touched && this.username?.errors?.['required']) {
            return 'Username is required!';
        }
        if (this.username?.errors?.['minlength']) {
            return 'Username should have atleast 5 characters!';
        }
        return '';
    };

    get email(): AbstractControl<any, any> | null {
        return this.form.get('email');
    };

    get isEmailInvalid(): boolean {
        const email = this.email;
        return !!(email?.invalid && (email.dirty || email.touched));
    }

    get invalidEmailMsg(): string {
        if (this.email?.touched && this.email?.errors?.['required']) {
            return 'Email is required!';
        }
        if (this.email?.errors?.['email']) {
            return 'Provide a valide email';
        }
        if (this.email?.errors?.['emailInvalid']) {
            return 'Only gmail is acceptable with "bg" or "com" sufix';
        }
        return '';
    };

    get tel(): AbstractControl<any, any> | null {
        return this.form.get('tel');
    };

    get isTelInvalid(): boolean {
        const tel = this.tel;
        return !!(tel?.invalid && (tel.dirty || tel.touched));
    }

    get invalidTelMsg(): string {
        if (this.tel?.touched && this.tel?.errors?.['required']) {
            return 'Phone number is required!';
        }
        return '';
    };

    get passwords(): FormGroup<any> {
        return this.form.get('passwords') as FormGroup;
    }

    get password(): AbstractControl<any, any> | null {
        return this.passwords?.get('password');
    };
    get repass(): AbstractControl<any, any> | null {
        return this.passwords?.get('repass');
    };

    get isPasswordInvalid(): boolean {
        return !!(this.password?.invalid && (this.password?.dirty || this.password.touched))
    };
    get isRepassInvalid(): boolean {
        return !!(this.repass?.invalid && (this.repass?.dirty || this.repass.touched))
    };

    get invalidPassMsg(): string {
        if (this.password?.errors?.['required']) {
            return 'Password is required!';
        }

        if (this.password?.errors?.['minlength']) {
            return 'Password must be at least 5 characters!';
        }

        if (this.password?.errors?.['pattern']) {
            return 'Password is not valid!';
        }

        return '';
    }

    get invalidRepassMsg(): string {
        if (this.repass?.errors?.['required']) {
            return 'Repeat password is required!';
        }

        if (this.repass?.errors?.['passwordMissmatch']) {
            return 'Passwords do not match!';
        }

        return '';
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
