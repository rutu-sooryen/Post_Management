import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/models/post.model';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  name = new FormControl('');
  post: Post | any;
  postDetailId: number | any;
  postDetail: any;

  postForm = new FormGroup({
    postId: new FormControl(''),
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    body: new FormControl(''),
  });

  constructor(private postService: PostService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this.postDetailId = localStorage.getItem('postDetailId');
    this.postDetail = localStorage.getItem('postDetail');
    if (this.postDetail) {
      this.post = JSON.parse(this.postDetail);
      this.updatePostFormValue();
    } else {
      this.postService.getPostDetail(this.postDetailId).subscribe((result) => {
        this.post = result;
        this.updatePostFormValue();
      },()=>{
        this.router.navigate(['page-not-found']);
      });
    }
  }

  updatePostFormValue() {
    this.postForm.controls.postId.patchValue(this.post.postId);
    this.postForm.controls.id.patchValue(this.post.id);
    this.postForm.controls.name.patchValue(this.post.name);
    this.postForm.controls.email.patchValue(this.post.email);
    this.postForm.controls.body.patchValue(this.post.body);
  }

  updatePost() {
    this.postService.updatePost(this.postForm.value).subscribe((res) => {
      this.postForm.controls.body.patchValue(res.body);
      this.router.navigate(['']);
    }, ()=>{
      this.router.navigate(['page-not-found']);
    });
  }

  backToPostList() {
    this.router.navigate(['']);
  }

}
