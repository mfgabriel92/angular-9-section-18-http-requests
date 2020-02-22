import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { BASE_URL } from 'src/utils/constants';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  read(): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASE_URL}/posts.json`).pipe(
      map(response => {
        const posts: Post[] = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            posts.push({ id: key, ...response[key] });
          }
        }

        return posts;
      })
    );
  }

  store(post: Post) {
    this.http
      .post<Post>(`${BASE_URL}/posts.json`, post)
      .subscribe(response => console.log(response));
  }
}
