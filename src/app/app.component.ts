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
  error: string = null;
  isLoading = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.readPosts();
  }

  onFetchPostsClick(): void {
    this.readPosts();
  }

  onCreatePostClick(post: Post): void {
    this.postService.store(post).subscribe(() => {
      this.readPosts();
    });
  }

  onDeletePostsClick(): void {
    this.postService.delete().subscribe(() => {
      this.posts = [];
    });
  }

  private readPosts(): void {
    this.posts = [];
    this.error = null;
    this.isLoading = true;

    this.postService.read().subscribe(
      posts => {
        this.isLoading = false;
        this.posts = posts;
      },
      ({ error }) => {
        this.isLoading = false;
        this.error = error.error;
      }
    );
  }
}
