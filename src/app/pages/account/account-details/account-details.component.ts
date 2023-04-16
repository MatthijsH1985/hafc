import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth-service";
import {CommentsService} from "../../../services/comments.service";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {

  user: any = {};
  loading: boolean = true;

  constructor(private authService: AuthService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUser() {
    return this.authService.getUserName();
  }

  logout(): void {
    this.authService.logOut();
  }
}
