import { Component } from '@angular/core';
import { Post } from '../post/post';
import { Observable } from 'rxjs';
import { SidePost } from '../../../../models';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../../core/services';

@Component({
  selector: 'app-side-posts',
  imports: [Post, CommonModule],
  templateUrl: './side-posts.html',
  styleUrl: './side-posts.css'
})
export class SidePosts {

    sidePosts$!: Observable<SidePost[]>

    constructor(private sidePostsService: PostsService) {
        this.sidePosts$ = this.sidePostsService.getPosts();
    }

}
