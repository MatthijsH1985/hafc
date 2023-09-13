import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthService} from "../../services/auth/auth-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentsService} from "../services/comments.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-report-comment',
  templateUrl: './report-comment.component.html',
  styleUrls: ['./report-comment.component.scss']
})
export class ReportCommentComponent {

  @Input() modalStatus: boolean | undefined;
  @Input() commentId: any | undefined;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() reportSuccesfull = new EventEmitter();
  @Input() userData: any;
  reportForm: FormGroup;

  constructor(private authService: AuthService, private toastService: ToastrService, private commentsService: CommentsService) {
    this.reportForm = new FormGroup({
      reason: new FormControl('', Validators.required)
    });
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onReportComment(form: FormGroup) {
    const commentData = {
      comment_id: this.userData.commentId,
      author: this.userData.author,
      author_name: this.userData.author_name,
      comment_content: this.userData.comment_content,
      reporter: this.userData.reporter,
      reason: form.value.reason
    };
    this.commentsService.reportComment(commentData).subscribe({
      next: (response: any) => {
        this.toastService.success('Wij gaan ernaar kijken en ondernemen zonodig actie.', 'Succesvol gerapporteerd')
        this.onCloseModal();
      },
      error: (err) => {
        this.toastService.success(err.error, 'Oops');
      }
    })
  }

}
