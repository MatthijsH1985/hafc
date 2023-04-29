import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../../services/comments.service";
import {AuthService} from "../../../services/auth/auth-service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit{

  comments: any = [];
  loadingComments: boolean = true;
  noCommentsLoaded: any | undefined;
  userID: number | undefined;
  constructor(private commentsService: CommentsService, private authService: AuthService) {}

  ngOnInit() {
    this.authenticateUser();
  }

  authenticateUser() {
    this.authService.getUserInfo(1).pipe(
      catchError((error: any) => {
        return of(null);
      })
    ).subscribe((user: any) => {
      this.userID = user.id
      if (this.userID) {
        this.getComments()
      }
    });
  }

  getComments() {
    this.commentsService.getCommentsByUserId(this.userID).subscribe({
      next: comments => {
        this.comments = comments;
        this.loadingComments = false;
        this.noCommentsLoaded = false;
      },
      error:error => {
        this.loadingComments = false;
        this.noCommentsLoaded = true;
      }
    })
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      return dateString.replace(/\s/, 'T');
    }
    return null;
  }

}
