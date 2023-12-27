import {Component, Input, OnInit} from '@angular/core';
import {faArrowDown, faArrowUp, faCheck} from '@fortawesome/free-solid-svg-icons';
import {CommentsService} from '../services/comments.service';
import {AuthService} from '../../services/auth/auth-service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    constructor(private commentsService: CommentsService,
                private authService: AuthService,
                private toastService: ToastrService
    ) {
    }
    private authSub = new Subscription();
    private loading: boolean = true;
    protected readonly faArrowDown = faArrowDown;
    protected readonly faCheck = faCheck;
    protected readonly faArrowUp = faArrowUp;
    @Input() isAuthenticated = false;
    @Input() comment: any = [];
    @Input() commentLevel: number = 0;

    ngOnInit() {
      console.log('Comment Level:', this.commentLevel);
    }

    isReplyButtonVisible(): boolean {
      return this.commentLevel < 3;
    }

    validDateFormat(dateString: any) {
      if(dateString) {
        return dateString.replace(/\s/, 'T');
      }
      return null;
    }

    onRateComment(score: number, comment: any) {
      const validatedScore = this.validateRating(score);
      this.authSub = this.authService.getUserInfo().subscribe({
        next: (user: any) => {
          const commentData = JSON.stringify( {
            comment_id: comment.id,
            author_id: user.id,
            like_dislike: validatedScore
          });
          this.rateComment(commentData);
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }

    rateComment(commentData: any) {
      this.commentsService.rateComment(commentData).subscribe({
        next: (result: any) => {
          if (result) {
            // Emit event
            // this.updateLikesAndDislikes(result.comment_id, result.likes, result.dislikes);
          }
        },
        error: error => {
          this.loading = false;
          this.toastService.error('Oops', error.error)
        }
      });
    }

    validateRating(rating: number): number {
      return rating === 1 ? 1 : -1;
    }

    onReplyToComment(commentID: number = 0) {
        this.commentsService.setCommentModalVisibility(true);
        this.commentsService.sendCommentId(commentID);
    }

}
