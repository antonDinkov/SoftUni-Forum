import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
    private auth = inject(Auth);
    public isLoggedIn = this.auth.isLoggedIn;
    public currentUser = this.auth.user;
}
