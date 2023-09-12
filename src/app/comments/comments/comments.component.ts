import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {faCheck, faBell, faArrowDown, faArrowUp, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {CommentsService} from "../services/comments.service";
import {AuthService} from "../../services/auth/auth-service";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges, OnDestroy {
  commentsSub: Subscription | undefined;
  commentsCountSub: Subscription | undefined;
  authSub: Subscription | undefined;
  @Input() postId: string | undefined;
  @Input() onReloadComments: boolean = false;
  comments: any = [];
  loading: boolean = true;
  noCommentsMessage = 'Er is (nog) niet gereageerd op dit artikel';
  loadingComments: boolean = true;
  noCommentsLoaded = true;
  faCheck = faCheck;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  faExclamationTriangle = faExclamationTriangle;
  commentPage: number = 1;
  faBell = faBell;
  newCommentCount: number = 0;
  reloadButtonVisible: any;
  modalReportOpen: boolean = false;
   @Input() initialCommentCount: number = 0;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isNewCommentsButtonVisible(winScroll);
  }

  constructor(private commentsService: CommentsService, private authService: AuthService, private changeDetectorRef: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: object) {
    this.commentsService.newCommentAdded$.subscribe((newComment) => {
      this.comments.unshift(newComment);
    });
  }

  onModalClose() {
    this.modalReportOpen = false;
  }

  onReportModalOpen() {
    this.modalReportOpen = true;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated()
  }

  isNewCommentsButtonVisible(scrollHeight: number): void {
    this.reloadButtonVisible = scrollHeight > 2000 ? true : false;
  }

  ngOnInit() {
    this.getComments(1);
  }

  validateRating(rating: number): number {
    return rating === 1 ? 1 : -1;
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
        console.log(err);
      }
    })
  }

  updateLikesAndDislikes(commentId: number, likes: number, dislikes: number) {
    const comment = this.comments.find((c: any) => c.id === commentId);
    if (comment) {
      comment.likes = likes;
      comment.dislikes = dislikes;
    }
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
      }
    });
  }

  checkForNewComments() {
    if (this.commentsCountSub && !this.commentsCountSub.closed) {
      return;
    } else {
      this.commentsCountSub = this.commentsService.getCommentsCount(this.postId).subscribe({
        next: (data: any) => {
          const commentCount = data.count;

          // Bereken het aantal nieuwe reacties
          const newCommentCount = commentCount - this.initialCommentCount;

          // Update this.newCommentCount met het nieuwe aantal
          this.newCommentCount = newCommentCount;
          this.closeNewCommentsSubscription();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  onAddReport(id: any) {
    this.modalReportOpen = true;
  }

  closeNewCommentsSubscription() {
    this.commentsCountSub?.unsubscribe();
  }

  loadNewComments() {
    this.commentPage = 1;
    this.getComments(1);
    this.newCommentCount = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['onReloadComments'] && !changes['onReloadComments'].firstChange) {
      this.getComments(this.commentPage);
    }
  }

  getComments(page: number) {
    this.commentsSub = this.commentsService.getComments(this.postId, this.commentPage).subscribe({
      next: comments => {
        // const newComments = comments.filter((comment: any) => !this.comments.some((existingComment: any) => existingComment.id === comment.id));
        // this.comments.unshift(...newComments);

        for (let i = 0; i < comments.length; i++) {
          this.comments.push(comments[i]);
        }
        this.loadingComments = false;
        this.noCommentsLoaded = false;
        this.commentPage++;
        this.changeDetectorRef.detectChanges();
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

  onLoadMoreComments() {
    this.getComments(this.commentPage);
  }

  ngOnDestroy() {
    this.commentsSub?.unsubscribe();
    this.commentsCountSub?.unsubscribe();
  }

}
