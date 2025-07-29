import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-logged-in',
  imports: [RouterLink],
  templateUrl: './logged-in.html',
  styleUrl: './logged-in.css'
})
export class LoggedIn {
    private auth = inject(Auth);
    private currentUser = this.auth.user;
    readonly username = this.currentUser()?.username;
}
