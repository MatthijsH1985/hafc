import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommentsService} from '../services/comments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  templateUrl: 'comment-form.component.html',
  selector: 'app-comment-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  post: any = [];
  @Input() isReply: boolean = false;
  @Input() comment: any = [];
  @Output() commentSuccesfullEmitter = new EventEmitter();
  loading = false;
  errorMessage: string = '';
  constructor(private commentsService: CommentsService,
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

  protected readonly faPaperPlane = faPaperPlane;
}
