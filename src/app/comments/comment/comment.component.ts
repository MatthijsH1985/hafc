import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {faArrowDown, faArrowUp, faCheck, faShare} from '@fortawesome/free-solid-svg-icons';
import {CommentsService} from '../services/comments.service';
import {AuthService} from '../../services/auth/auth-service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

import moment from 'moment';
import 'moment/locale/nl';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    constructor(private commentsService: CommentsService,
                private authService: AuthService,
                private toastService: ToastrService,
                private cdr: ChangeDetectorRef,
                private viewportScroller: ViewportScroller
    ) {
    }
    private authSub = new Subscription();
    private loading: boolean = true;
    commentFormOpen = false;
    protected readonly faArrowDown = faArrowDown;
    protected readonly faCheck = faCheck;
    protected readonly faArrowUp = faArrowUp;
    @Input() isAuthenticated = false;
    @Input() comment: any = [];
    @Input() commentLevel: number = 0;
    @Input() comments: any | undefined;

    ngOnInit() {
    }

    isReplyButtonVisible(): boolean {
      return this.commentLevel < 2;
    }

    firstCharacters(authorName: string) {
        return authorName.substring(0,3);
    }

    validDateFormat(dateString: any) {
      if(dateString) {
        return dateString.replace(/\s/, 'T');
      }
      return null;
    }

    onRateComment(score: number, comment: any) {
      const validatedScore = this.validateRating(score);
      const commentData = JSON.stringify( {
        comment_id: comment.id,
        like_dislike: validatedScore
      });
      this.rateComment(commentData, validatedScore)
    }

    rateComment(commentData: any, score: number) {
      this.commentsService.rateComment(commentData).subscribe({
        next: (result: any) => {
          if (result) {
            if (!result.error) {
              this.comment.likes_dislikes = this.comment.likes_dislikes + score;
              this.updateLikesAndDislikes(result.comment_id, result.likes, result.dislikes);
            } else {
              this.toastService.error('Je kan een reactie maar 1 keer liken of disliken');
            }
          }
        },
        error: error => {
          this.loading = false;
          this.toastService.error('Oops', error.error)
        }
      });
    }

  calculateTimeDifference(startDate: string): string {
    return moment(startDate).fromNow();
  }

  updateLikesAndDislikes(commentId: number, likes: number, dislikes: number) {
    const comment = this.comment;
    if (comment) {
      comment.likes = likes;
      comment.dislikes = dislikes;
      this.cdr.detectChanges();
    }
  }

    validateRating(rating: number): number {
      return rating === 1 ? 1 : -1;
    }

    onReplyToComment(commentID: number = 0) {
      this.commentFormOpen = true;
      this.commentsService.sendCommentId(commentID);
      this.navigateToCommentForm('comment-form-' + commentID);
    }

    navigateToCommentForm(fragment: any) {
      setTimeout(() => {
        this.scrollToElement(fragment);
      }, 100)
    }

    private scrollToElement(fragment: string): void {
      const element = document.getElementById(fragment);
      if (element) {
        const offset = 250; // Pas dit aan naar de gewenste offsetwaarde
        const elementRect = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementRect - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    protected readonly faShare = faShare;

}
