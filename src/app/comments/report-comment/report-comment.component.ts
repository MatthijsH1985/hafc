import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth/auth-service";

@Component({
  selector: 'app-report-comment',
  templateUrl: './report-comment.component.html',
  styleUrls: ['./report-comment.component.scss']
})
export class ReportCommentComponent implements OnInit {

  @Input() modalStatus: boolean | undefined;
  @Input() commentId: any | undefined;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() reportSuccesfull = new EventEmitter();

  constructor(private authService: AuthService) {}

  onCloseModal() {
    this.closeModal.emit(false);
  };

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    if (this.authService.isAuthenticated()) {
      return true
    } else {
      return false
    }
  }

  onreportSuccesfull() {

  }

}
