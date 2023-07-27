import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth-service";
import {CommentsService} from "../../../comments/services/comments.service";

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit{

  comments: any = [];
  constructor(private commentsService: CommentsService, private authService: AuthService) {}

  ngOnInit() {
    const userID = Number(this.authService.getUserID());
    this.commentsService.getCommentsByUserId(userID).subscribe({
      next: (comments: any) => {
        this.comments = comments;
      },
      error: (error: any) => {
        console.log('error');
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
