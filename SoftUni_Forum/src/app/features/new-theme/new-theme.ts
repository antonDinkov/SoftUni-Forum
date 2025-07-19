import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTheme } from '../../core/services/create-theme';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-new-theme',
    imports: [RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './new-theme.html',
    styleUrl: './new-theme.css'
})
export class NewTheme {
    private theme = inject(CreateTheme);
    public form: FormGroup;
    private router = inject(Router);

    constructor(private fb: FormBuilder){
        this.form = this.fb.group({
            themeName: ['', Validators.required],
            postText: ['', Validators.required]
        })
    }

    createTheme () {
        if (this.form.invalid) return;

        const { themeName, postText } = this.form.value;

        this.theme.create(themeName, postText).subscribe({
            next: () => this.router.navigate(['/catalog']),
            error: (err) => {
                console.error('Failed to create new theme: ', err);
                this.router.navigate(['/greshka']);
            }
        })
    }

    cancelTheme (event: Event) {
        event.preventDefault();
        this.router.navigate(['/home']);
    }
}
