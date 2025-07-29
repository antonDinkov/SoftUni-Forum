import { Component, inject } from '@angular/core';
import { ThemeBoard } from './themes';
import { SidePosts } from './sidePosts/side-posts/side-posts';
import { Auth } from '../../core/services/auth.service';

@Component({
  selector: 'app-catalog',
  imports: [ThemeBoard, SidePosts],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
    private auth = inject(Auth);
    isLoggedIn = this.auth.isLoggedIn
}
