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
import {AuthService} from "../../services/auth/auth-service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Route} from '@angular/router';
import {CommentNode} from '../model/comment-node.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges, OnDestroy, OnInit {
  commentsSub: Subscription | undefined;
  commentsCountSub: Subscription | undefined;
  comments = this.route.snapshot.data['comments'];
  loading: boolean = true;
  noCommentsMessage = 'Er is (nog) niet gereageerd op dit artikel';
  loadingComments: boolean = true;
  noCommentsLoaded = true;
  commentPage: number = 2;
  newCommentCount: number = 0;
  hierarchicalComments: CommentNode[] = [];
  @Input() initialCommentCount: number = 0;
  @Input() postId: string | undefined;
  @Input() onReloadComments: boolean = false;
  @Output() replyToComment: EventEmitter<number> = new EventEmitter<number>();

  constructor(private route: ActivatedRoute, private commentsService: CommentsService, private toastService: ToastrService, private authService: AuthService, private changeDetectorRef: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: object) {
    this.commentsService.newCommentAdded$.subscribe((newComment) => {
      this.comments.unshift(newComment);
    });
  }

  ngOnInit() {
    this.buildCommentHierarchy();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated()
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

  updateLikesAndDislikes(commentId: number, likes: number, dislikes: number) {
    const comment = this.comments.find((c: any) => c.id === commentId);
    if (comment) {
      comment.likes = likes;
      comment.dislikes = dislikes;
    }
  }

  loadNewComments() {
    this.commentPage = 1;
    this.getComments(1);
    this.newCommentCount = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['onReloadComments'] && !changes['onReloadComments'].firstChange) {
      this.getComments(this.commentPage);
      this.buildCommentHierarchy();
      console.log(this.comments);
    }
  }

  getComments(page: number) {
    this.commentsSub = this.commentsService.getComments(this.postId, this.commentPage).subscribe({
      next: comments => {
        for (let i = 0; i < comments.length; i++) {
          this.comments.push(comments[i]);
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

  onLoadMoreComments() {
    this.getComments(this.commentPage);
  }

  ngOnDestroy() {
    this.commentsSub?.unsubscribe();
    this.commentsCountSub?.unsubscribe();
  }

}
