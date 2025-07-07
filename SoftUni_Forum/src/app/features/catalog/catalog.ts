import { Component } from '@angular/core';
import { ThemeBoard } from './themes';
import { SidePosts } from './sidePosts/side-posts/side-posts';

@Component({
  selector: 'app-catalog',
  imports: [ThemeBoard, SidePosts],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {

}
