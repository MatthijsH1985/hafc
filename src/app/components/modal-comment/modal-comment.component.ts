import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {CommentsService} from "../../services/comments.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {comment} from "postcss";
import {AuthService} from "../../services/auth/auth-service";

@Component({
  selector: 'app-modal-comment',
  templateUrl: './modal-comment.component.html',
  styleUrls: ['./modal-comment.component.scss']
})
export class ModalCommentComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() modalStatus: boolean | undefined;
  @Input() postId: number | undefined;

  commentForm: FormGroup;

  constructor(private commentService: CommentsService, private authService: AuthService) {

    this.commentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      comment: new FormControl('', Validators.required)
    });
  }

  onCloseModal() {
    this.closeModal.emit(false);
  };

  onPostComment(form: FormGroup): void {
    const commentData = JSON.stringify( {
      post: this.postId,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      author_name: form.value.name,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      author_email: form.value.email,
      content: form.value.comment
    });

    const user = this.authService.getLoggedInUser();
    this.commentService.postComment(commentData, user).subscribe({
      next: value => console.log(alert('Gelukt')),
      error: err => console.log(err)
    })
  }

}
