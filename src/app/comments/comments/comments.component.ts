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
import {ActivatedRoute, Route, Router} from '@angular/router';
import {CommentNode} from '../model/comment-node.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

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
  commentPage: number = 1;
  newCommentCount: number = 0;
  disableLoadMoreButton = false;
  errorMessage = '';
  hierarchicalComments: CommentNode[] = [];
  replyToCommentId: number = 0;
  reloadComments = false;
  replyToCommentVisibility = false;
  @Input() initialCommentCount: number = 0;
  @Input() post: any | undefined;
  @Input() onReloadComments: boolean = false;
  @Output() replyToComment: EventEmitter<number> = new EventEmitter<number>();
  constructor(private route: ActivatedRoute,
              private commentsService: CommentsService,
              private router: Router,
              private authService: AuthService,
              private toast: ToastrService,
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
  }

  getComments(page: number) {
    this.commentsSub = this.commentsService.getComments(this.post.id, this.commentPage).subscribe({
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

  commentSuccesfull(event: any) {
    console.log(event);
  }

  onLoadMoreComments() {
    this.getComments(this.commentPage);
  }

  ngOnDestroy() {
    this.commentsSub?.unsubscribe();
    this.commentsCountSub?.unsubscribe();
  }

  protected readonly faPaperPlane = faPaperPlane;
}
