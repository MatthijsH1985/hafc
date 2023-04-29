import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth-service";
import {CommentsService} from "../../../services/comments.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  loading: boolean = true;

  constructor(private authService: AuthService, private commentsService: CommentsService) {

  }

  ngOnInit() {

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
