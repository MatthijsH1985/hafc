import {
  ChangeDetectorRef,
  Component, EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {CommentsService} from "../services/comments.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CommentNode} from '../model/comment-node.model';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

import {CommonModule} from '@angular/common';
import {CommentComponent} from '../comment/comment.component';
import {CommentFormComponent} from '../comment-form/comment-form.components';
import {CommentTreeComponent} from '../comment-tree/comment-tree.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    CommentFormComponent,
    CommentTreeComponent
  ]
})
export class CommentsComponent implements OnChanges, OnDestroy, OnInit {
  commentsSub: Subscription | undefined;
  commentsCountSub: Subscription | undefined;
  comments = this.route.snapshot.data['comments'];
  loading: boolean = true;
  noCommentsMessage = 'Er is (nog) niet gereageerd op dit artikel';
  loadingComments: boolean = true;
  noCommentsLoaded = true;
  commentPage: number = 1;
  disableLoadMoreButton = false;
  errorMessage = '';
  hierarchicalComments: CommentNode[] = [];
  replyToCommentId: number = 0;
  replyToCommentVisibility = false;
  @Input() initialCommentCount: number = 0;
  @Input() post: any | undefined;
  @Input() onReloadComments: boolean = false;
  @Output() replyToComment: EventEmitter<number> = new EventEmitter<number>();
  constructor(private route: ActivatedRoute,
              private commentsService: CommentsService,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.commentsService.newCommentAdded$.subscribe((newComment) => {
      this.comments.unshift(newComment);
      this.buildCommentHierarchy();
    });
    this.commentsService.replyVisible$.subscribe((visibility) => {
      this.replyToCommentVisibility = visibility;
    })

    this.commentsService.commentId$.subscribe((commentId) => {
      this.replyToCommentId = commentId;
    });
  }

  ngOnInit() {
    if (!this.post.acf.link_naar_pagina) {
      this.buildCommentHierarchy();
    }
  }

  buildCommentHierarchy() {
    const commentMap = new Map<number, CommentNode>();

    this.comments.forEach((comment: any) => {
      const commentNode = new CommentNode(comment);
      commentMap.set(comment.id, commentNode);
    });

    this.comments.forEach((comment: any) => {
      const commentNode = commentMap.get(comment.id);
      if (commentNode) {
        const parentCommentNode = commentMap.get(comment.parent);
        if (parentCommentNode) {
          parentCommentNode.children.push(commentNode);
          commentNode.level = parentCommentNode.level + 1;
        }
      }
    });

    this.hierarchicalComments = Array.from(commentMap.values()).filter(commentNode => !commentNode.comment.parent);
  }

  loadMoreComments() {
    this.commentPage++;
    this.commentsService.getComments(this.post.id, this.commentPage)
      .subscribe({
        next: (newComments: any[]) => {
          if (Array.isArray(newComments) && newComments.length > 0) {
            this.comments = [...this.comments, ...newComments];
            this.buildCommentHierarchy();
            this.changeDetectorRef.detectChanges();
          } else {
            this.disableLoadMoreButton = true;
          }
        },
        error: () => {
          console.log('Er is een error opgetreden');
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reloadComments'] && !changes['reloadComments'].firstChange) {
      this.getComments(this.commentPage);
      this.buildCommentHierarchy();
    }
    if (changes['post']) {
      this.getComments(this.commentPage);
    }
  }

  getComments(page: number) {
    let postId = this.post.id;
    if (this.post.acf.link_naar_pagina) {
      postId = this.post.acf.link_naar_pagina[1];
    }
    this.commentsSub = this.commentsService.getComments(postId, this.commentPage).subscribe({
      next: comments => {
        if (!this.comments) {
          this.comments = comments;
          this.buildCommentHierarchy()
        } else {
          for (let i = 0; i < comments.length; i++) {
            this.comments.push(comments[i]);
          }
        }
        this.loadingComments = false;
        this.noCommentsLoaded = false;
        this.commentPage++;
        this.changeDetectorRef.detectChanges();
      },
      error:error => {
        this.loadingComments = false;
        this.noCommentsLoaded = true;
      }
    })
  }

  commentSuccesfull(event: any) {
    console.log(event);
  }

  ngOnDestroy() {
    this.commentsSub?.unsubscribe();
    this.commentsCountSub?.unsubscribe();
  }

  protected readonly faPaperPlane = faPaperPlane;
}
