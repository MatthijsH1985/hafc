import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth-service";
import {CommentsService} from "../../../comments/services/comments.service";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {

  loading: boolean = true;

  constructor(private authService: AuthService, private commentsService: CommentsService) {

  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  getUser() {
    return this.authService.getUserName();
  }

  logout(): void {
    this.authService.logOut();
  }
}
