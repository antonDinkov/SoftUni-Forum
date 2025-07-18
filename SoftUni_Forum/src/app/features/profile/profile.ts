import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
    private auth = inject(Auth);
    public currentUser = this.auth.user;

    onEdit():void{
        alert('Edit functionality will be implemented in the next workshop!')
    }
}
