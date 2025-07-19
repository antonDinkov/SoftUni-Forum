import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
    private auth = inject(Auth);
    readonly currentUser = this.auth.user;
    public userId = this.currentUser()?._id;
    private router = inject(Router);

    onEdit():void{
        this.router.navigate(['/profile/edit']);
    }
}
