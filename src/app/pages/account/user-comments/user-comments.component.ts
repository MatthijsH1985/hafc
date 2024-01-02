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
        this.comments = response.map((comment: any) => {
          // Hier kun je je eigen logica toepassen om de post_permalink-waarde aan te passen
          comment.post_permalink = this.updatePostPermalink(comment.post_permalink);
          return comment;
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  updatePostPermalink(oldPermalink: string): string {
    if (oldPermalink.startsWith('https://backend.hafc.nl')) {
      return oldPermalink.replace('https://backend.hafc.nl', 'https://www.hafc.nl');
    } else {
      return oldPermalink;
    }
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      return dateString.replace(/\s/, 'T');
    }
    return null;
  }

}
