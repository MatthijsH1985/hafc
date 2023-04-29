import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth-service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, of} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modal-comment',
  templateUrl: './modal-comment.component.html',
  styleUrls: ['./modal-comment.component.scss']
})
export class ModalCommentComponent {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() modalStatus: boolean | undefined;
  @Input() postId: number | undefined;

  username: string | null = '';
  user_email: string | null = '';
  errorMessage: string | undefined;
  @Output() commentSuccesful = new EventEmitter();

  commentForm: FormGroup;

  constructor(private commentService: CommentsService, private toastrService: ToastrService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.commentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      comment: new FormControl('', Validators.required)
    });
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

  onPostComment(form: FormGroup): void {
    if (this.isLoggedIn()) {
      const commentData = JSON.stringify( {
        post: this.postId,
        author_name: this.authService.getUserName(),
        author_email: this.authService.getUserEmail(),
        content: form.value.comment
      });
      this.postComment(commentData);
    } else {
      const commentData = JSON.stringify( {
        post: this.postId,
        author_name: form.value.name,
        author_email: form.value.email,
        content: form.value.comment
      });
      this.postComment(commentData);
    }
  }

  postComment(commentData: any) {
    this.commentService.postComment(commentData).pipe(
      catchError((error: any) => {
        this.errorMessage = error.error.message;
        this.toastrService.error(error.error.message, 'Oeps!');
        return of(null);
      })
    ).subscribe((result) => {
      if (result) {
        this.onCommentSuccesfull(result);
        this.toastrService.success('Je reactie is geplaatst', 'Gelukt!');
      }
    });
  }

  onCommentSuccesfull(comment: any) {
    this.commentSuccesful.emit(comment);
  }
}
