import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth-service";
import {CommentsService} from "../../../comments/services/comments.service";
import {error} from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit{

  comments: any = [];
  constructor(private commentsService: CommentsService, private authService: AuthService) {}

  ngOnInit() {
    const userId = this.authService.getUserInfo().subscribe({
      next: (response: any) => {
        this.onGetCommentsByUserId(response.id);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onGetCommentsByUserId(userId: number) {
    this.commentsService.getLatestCommentsByUser(userId).subscribe( {
      next: (response: any) => {
        this.comments = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      return dateString.replace(/\s/, 'T');
    }
    return null;
  }

}
