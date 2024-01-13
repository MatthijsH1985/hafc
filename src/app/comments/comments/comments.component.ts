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
  commentForm: FormGroup;
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
    this.commentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      comment: new FormControl('', Validators.required)
    });
    this.commentsService.commentId$.subscribe((commentId) => {
      this.replyToCommentId = commentId;
    });
  }

  getCommentAuthorName(id: number) {
    const comment = this.comments.find((comment: any) => comment.id === id);
    if (comment) {
      return comment.author_name;
    } else {
      return 'Author not found';
    }
  }

  postComment(commentData: any) {
    this.commentsService.postComment(commentData).subscribe({
      next: result => {
        if (result) {
          this.onCommentSuccesfull(result);
          this.commentsService.addNewComment(result);
        }
      },
      error: error => {
        this.errorMessage = error.error.message;
        this.loading = false;
      }
    });
  }

  onPostComment(form: FormGroup, commentParentId?: number): void {
    let commentData: any;
    if (this.isLoggedIn()) {
      const userId = this.authService.getUserInfo().subscribe({
        next: (response: any) => {
          commentData = {
            post: this.post.id,
            author_name: this.authService.getUserName(),
            author_email: this.authService.getUserEmail(),
            content: form.value.comment,
            author: response.id
          };
          if (this.replyToCommentId !== undefined) {
            commentData.parent = this.replyToCommentId;
          }
          this.postComment(JSON.stringify(commentData));
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    } else {
      commentData = {
        post: this.post.id,
        author_name: form.value.name,
        author_email: form.value.email,
        content: form.value.comment,
      };
      if (this.replyToCommentVisibility !== undefined) {
        commentData.parent = this.replyToCommentId;
      }
      this.postComment(JSON.stringify(commentData));
    }
  }

  getUserName() {
    return this.authService.getUserName()
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('');
  }

  isLoggedIn(): boolean {
    if (this.authService.isAuthenticated()) {
      return true
    } else {
      return false
    }
  }

  onCommentSuccesfull(comment: any) {
    this.toast.success('Reactie is geplaatst', 'Succes');
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
    this.reloadComments = !this.reloadComments;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    console.log(this.comments);
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

  onLoadMoreComments() {
    this.getComments(this.commentPage);
  }

  ngOnDestroy() {
    this.commentsSub?.unsubscribe();
    this.commentsCountSub?.unsubscribe();
  }

  protected readonly faPaperPlane = faPaperPlane;
}
