import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth-service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CommentsService} from "../services/comments.service";

@Component({
  selector: 'app-modal-comment',
  templateUrl: './modal-comment.component.html',
  styleUrls: ['./modal-comment.component.scss']
})
export class ModalCommentComponent implements OnChanges {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() modalStatus: boolean | undefined;
  @Input() postId: number | undefined;
  replyToCommentId: number | undefined;

  username: string | null = '';
  user_email: string | null = '';
  errorMessage: string | undefined;
  @Output() commentSuccesful = new EventEmitter();
  token: string|undefined;
  loading: boolean= false;

  commentForm: FormGroup;

  constructor(private commentService: CommentsService, private toastrService: ToastrService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.token = undefined;
    this.commentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      comment: new FormControl('', Validators.required)
    });
    this.commentService.commentId$.subscribe((commentId) => {
      this.replyToCommentId = commentId;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['replyToCommentId'] && changes['replyToCommentId'].currentValue !== changes['replyToCommentId'].previousValue) {
      const newReplyToCommentId = changes['replyToCommentId'].currentValue;

      if (newReplyToCommentId !== undefined) {
        this.replyToCommentId = newReplyToCommentId;
      }
    }
  }

  ngOnInit() {
    this.isLoggedIn();
  }

  getUserName() {
    return this.authService.getUserName()
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('');
  }

  onCloseModal() {
    this.closeModal.emit(false);
  };

  isLoggedIn(): boolean {
    if (this.authService.isAuthenticated()) {
      return true
    } else {
      return false
    }
  }

  onPostComment(form: FormGroup, commentParentId?: number): void {
    let commentData: any;
    if (this.isLoggedIn()) {
      const userId = this.authService.getUserInfo().subscribe({
        next: (response: any) => {
          commentData = {
            post: this.postId,
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
        post: this.postId,
        author_name: form.value.name,
        author_email: form.value.email,
        content: form.value.comment,
      };
      if (this.replyToCommentId !== undefined) {
        commentData.parent = this.replyToCommentId;
      }
      this.postComment(JSON.stringify(commentData));
    }
  }

  postComment(commentData: any) {
    this.commentService.postComment(commentData).subscribe({
      next: result => {
        if (result) {
          this.onCommentSuccesfull(result);
          this.commentService.addNewComment(result);
        }
      },
      error: error => {
        this.errorMessage = error.error.message;
        this.loading = false;
      }
    });
  }

  onCommentSuccesfull(comment: any) {
    this.commentSuccesful.emit(comment);
  }
}
