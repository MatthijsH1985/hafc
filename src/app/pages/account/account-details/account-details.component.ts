import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth-service";
import {CommentsService} from "../../../services/comments.service";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  user: any = {};
  loading: boolean = true;

  constructor(private authService: AuthService, private commentsService: CommentsService) {
    this.user = this.authService.getLoggedInUser();
  }

  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
    this.commentsService.getCommentsByUserId(1, this.user).subscribe({
      next: value => {
        console.log(value);
      }
    });
  }
}
