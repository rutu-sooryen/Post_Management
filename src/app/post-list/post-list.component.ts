import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/models/post.model';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  closeResult = "";
  postDetailId: number | any;
  postDetail: any;
  posts: Post[] | any = [];
  faEdit = faPenToSquare;
  faTrash = faTrashCan;

  constructor(
    private postService: PostService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postDetailId = localStorage.getItem('postDetailId');
    this.postDetail = localStorage.getItem('postList');
    if (this.postDetail) {
      this.posts = JSON.parse(this.postDetail);
    } else {
      this.getPostList();
    }
  }

  getPostList() {
    this.postService.getPostList().subscribe((res) => {
      localStorage.setItem('postList', JSON.stringify(res));
      this.posts = res;
    }, () => {
      this.router.navigate(['page-not-found']);
    });
  }

  setPostDetail(post: Post) {
    localStorage.setItem('postDetailId', post.id.toString());
    localStorage.setItem('postDetail', JSON.stringify(post));
    this.router.navigate([`/post-detail/${post.id}`], { state: { data: post } });
  }

  open(content: any, post: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
      this.postService.deletePost(post.id).subscribe(() => {
        this.getPostList();
      }, () => {
        this.router.navigate(['page-not-found']);
      });
    }, (reason: any) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }


}
