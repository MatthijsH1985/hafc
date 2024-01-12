import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {faArrowDown, faArrowUp, faCheck, faShare} from '@fortawesome/free-solid-svg-icons';
import {CommentsService} from '../services/comments.service';
import {AuthService} from '../../services/auth/auth-service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

import * as moment from 'moment';
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
      return this.commentLevel < 3;
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
            this.updateLikesAndDislikes(result.comment_id, result.likes, result.dislikes);
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

    onReplyToComment(commentID: number = 0, authorName: string = '') {
      this.commentsService.setReplyToCommentModalVisibility(true);
      this.commentsService.sendCommentId(commentID);
      this.navigateToCmmentForm('comment-form');
    }

    navigateToCmmentForm(fragment: any) {
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
          behavior: 'auto',
        });
      }
    }

    protected readonly faShare = faShare;

}
