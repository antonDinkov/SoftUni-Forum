import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTheme } from '../../core/services/create-theme';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-new-theme',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './new-theme.html',
    styleUrl: './new-theme.css'
})
export class NewTheme {
    private theme = inject(CreateTheme);
    private router = inject(Router);

    themeName: string = '';
    titleError: boolean = true;
    titleErrorMsg: string = '';

    postText: string = '';
    contentError: boolean = true;
    contentErrorMsg: string = '';

    validateTitle():void {
        if(!this.themeName){
            this.titleError = true;
            this.titleErrorMsg = 'Theme name is required';
        } else if (this.themeName.length < 5) {
            this.titleError = true;
            this.titleErrorMsg = 'Theme name must be atleast 5 characters long';
        } else {
            this.titleError = false;
            this.titleErrorMsg = '';
        }
    };

    validateContent(): void {
        if (!this.postText) {
            this.contentError = true;
            this.contentErrorMsg = 'Textfield is required!'
        } else if (this.postText.length < 10) {
            this.contentError = true;
            this.contentErrorMsg = 'Textfield must be atleast 10 characters long!'
        } else {
            this.contentError = false;
            this.contentErrorMsg = '';
        }
    }

    createTheme () {
        if (!this.themeName || !this.postText) return;

        

        this.theme.create(this.themeName, this.postText).subscribe({
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
