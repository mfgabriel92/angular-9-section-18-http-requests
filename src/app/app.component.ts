import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onCreatePost(data: Post): void {
    this.http
      .post('https://angular-9-section-18-http-req.firebaseio.com/', data)
      .subscribe(response => console.log(response));
  }

  onFetchPosts(): Post[] {
    return [];
  }

  onClearPosts(): void {}
}
