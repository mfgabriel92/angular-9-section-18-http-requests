import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { BASE_URL } from 'src/utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  onCreatePostClick(data: Post): void {
    this.http
      .post<Post>(`${BASE_URL}/posts.json`, data)
      .subscribe(response => console.log(response));
  }

  onFetchPostsClick(): void {
    this.fetchPosts();
  }

  onClearPostsClick(): void {}

  private fetchPosts(): void {
    this.http
      .get<Post[]>(`${BASE_URL}/posts.json`)
      .pipe(
        map(response => {
          const posts: Post[] = [];

          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              posts.push({ id: key, ...response[key] });
            }
          }

          return posts;
        })
      )
      .subscribe(response => console.log(response));
  }
}
