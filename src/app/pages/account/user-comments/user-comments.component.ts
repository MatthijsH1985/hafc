import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../../services/comments.service";
import {AuthService} from "../../../services/auth/auth-service";

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
      next: comments => {
        this.comments = comments;
        console.log(comments);
      },
      error:error => {

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
