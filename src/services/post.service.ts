import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.baseUrl;
  postList = 'postList';

  constructor(public http: HttpClient) { }

  getPostList(): Observable<Post[] | any> {
    return this.http.get(this.baseUrl + this.postList);
  }

  getPostDetail(postId: number) {
    return this.http.get(this.baseUrl + this.postList + '/' + postId)
  }

  updatePost(post: any): Observable<any> {
    return this.http.patch(
      this.baseUrl + this.postList + '/' + post.id, post
    );
  }

  deletePost(postId: number): Observable<Object> {
    return this.http.delete(this.baseUrl + this.postList + '/' + postId);
  }
}
