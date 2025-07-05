import { Component, Input } from '@angular/core';
import { SidePost } from '../../../models';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post {
@Input() post!: SidePost;
}
