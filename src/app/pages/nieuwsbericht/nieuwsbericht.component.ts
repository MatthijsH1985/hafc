import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import {Title} from "@angular/platform-browser";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-nieuwsbericht',
  templateUrl: './nieuwsbericht.component.html',
  styleUrls: ['./nieuwsbericht.component.scss']
})
export class NieuwsberichtComponent implements OnInit, OnDestroy {
  currentPostSub: Subscription | undefined;
  postId: any = this.activatedRoute.snapshot.paramMap.get('id')
  post: any;
  name: string = '';
  loading: boolean = true;
  currentRoute: any;
  modalCommentsOpen: boolean = false;
  @Output() reloadComments: any;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostsService,
              private route: Router,
              private titleService: Title,
              private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {
    this.loading = true;
    this.currentRoute = this.route.url;
    this.loadPost();
  }

  loadPost() {
    this.currentPostSub = this.postService.getPost(this.postId).subscribe({
      next: post => {
        this.post = post;
        this.loading = false;
        this.titleService.setTitle(this.post.title.rendered);
        this.viewportScroller.scrollToPosition([0, 0]);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  addComment(comment: any) {
    this.reloadComments = true;
    this.onModalClose();
  }

  onModalClose() {
    this.modalCommentsOpen = false;
  }

  onOpenCommentModal() {
    this.modalCommentsOpen = true;
  }

  ngOnDestroy() {
    this.currentPostSub?.unsubscribe()
  }

}
