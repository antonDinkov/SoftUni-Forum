import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { ThemeBoard } from './features/themes';
import { SidePosts } from './features/sidePosts/side-posts/side-posts';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, ThemeBoard, SidePosts],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'SoftUni_Forum';
}
