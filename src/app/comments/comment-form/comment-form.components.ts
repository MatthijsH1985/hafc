import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommentsService} from '../services/comments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {ColorPickerModule} from 'primeng/colorpicker';
import {CommonModule} from '@angular/common';
import {Button} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

@Component({
  templateUrl: 'comment-form.component.html',
  selector: 'app-comment-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    IconFieldModule,
    InputIconModule,
    ColorPickerModule,
    CommonModule,
    Button,
    Ripple
  ]
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;
  post: any = [];
  postId: any;
  @Input() isReply: boolean = false;
  @Input() comment: any = [];
  @Input() transferPost: any;
  @Output() commentSuccesfullEmitter = new EventEmitter();
  loading = false;
  errorMessage: string = '';
  constructor(private commentsService: CommentsService,
              private route: ActivatedRoute,
              private toast: ToastrService) {
    this.commentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      comment: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.post = this.route.snapshot.data['post'];
    if (this.route.snapshot.data['post']) {
      this.post = this.route.snapshot.data['post'];
      this.postId = this.post.id;
    } else {
      this.postId = this.transferPost.acf.link_naar_pagina[1];
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
    commentData = {
      post: this.postId,
      author_name: form.value.name,
      author_email: form.value.email,
      content: form.value.comment,
    };
    console.log(commentData);
    if (this.comment.id !== undefined) {
      commentData.parent = this.comment.id;
    }
    this.postComment(JSON.stringify(commentData));
  }

  protected readonly faPaperPlane = faPaperPlane;
}
