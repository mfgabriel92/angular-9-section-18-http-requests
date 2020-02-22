import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  isLoading = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.readPosts();
  }

  onCreatePostClick(post: Post): void {
    this.postService.store(post);
  }

  onFetchPostsClick(): void {
    this.readPosts();
  }

  onClearPostsClick(): void {}

  private readPosts(): void {
    this.posts = [];
    this.isLoading = true;
    this.postService.read().subscribe(response => {
      this.isLoading = false;
      this.posts = response;
    });
  }
}
