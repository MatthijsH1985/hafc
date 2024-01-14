import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentsService} from '../services/comments.service';
import {AuthService} from '../../services/auth/auth-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: 'comment-form.component.html',
  selector: 'app-comment-form'
})
export class CommentFormComponents implements OnInit {
  commentForm: FormGroup;
  post: any = [];
  @Input() isReply: boolean = false;
  @Input() comment: any = [];
  @Output() commentSuccesfullEmitter = new EventEmitter();
  loading = false;
  errorMessage: string = '';
  constructor(private commentsService: CommentsService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) {
    this.commentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      comment: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.post = this.route.snapshot.data['post'];
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
    this.commentSuccesfullEmitter.emit(true);
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
    this.toast.success('Reactie is geplaatst', 'Succes');
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
          if (this.comment.id !== undefined) {
            commentData.parent = this.comment.id;
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
      if (this.comment.id !== undefined) {
        commentData.parent = this.comment.id;
      }
      this.postComment(JSON.stringify(commentData));
    }
  }

  protected readonly faPaperPlane = faPaperPlane;
}
