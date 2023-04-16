import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth-service";
import {Router} from "@angular/router";

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

  commentForm: FormGroup;

  constructor(private commentService: CommentsService, private authService: AuthService, private router: Router) {

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
    if (this.authService.isLoggedIn()) {
      this.username = this.authService.getUserName();
      this.user_email = this.authService.getUserEmail()
      this.commentForm = new FormGroup({
        name: new FormControl(this.username, Validators.required),
        email: new FormControl(this.user_email, Validators.email),
        comment: new FormControl('', Validators.required)
      });
      return true
    } else {
      return false
    }
  }

  onPostComment(form: FormGroup): void {
    const commentData = JSON.stringify( {
      post: this.postId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      author_name: form.value.name,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      author_email: form.value.email,
      content: form.value.comment
    });
  }

}
