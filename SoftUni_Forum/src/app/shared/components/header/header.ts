import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Guest } from '../menu/guest/guest';
import { LoggedIn } from '../menu/logged-in/logged-in';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Guest, LoggedIn],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
    private auth = inject(Auth);
    isLoggedIn = this.auth.isLoggedIn;

    logout() {
        this.auth.logout();
    }
}
