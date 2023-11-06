import {
  AfterViewInit,
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
import {ToastrService} from "ngx-toastr";
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Route} from '@angular/router';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  commentsSub: Subscription | undefined;
  commentsCountSub: Subscription | undefined;
  comments = this.route.snapshot.data['comments'];
  authSub: Subscription | undefined;
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
  commentUserData: any;
  @Input() initialCommentCount: number = 0;
  @Input() postId: string | undefined;
  @Input() onReloadComments: boolean = false;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;
    this.isNewCommentsButtonVisible(winScroll);
  }

  constructor(private route: ActivatedRoute, private commentsService: CommentsService, private toastService: ToastrService, private authService: AuthService, private changeDetectorRef: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: object) {
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
    // this.getComments(1);
    console.log(this.comments);
  }

  ngAfterViewInit() {
    this.animateComments();
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
        console.log(err)
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
        this.toastService.error('Oops', error.error)
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

  onAddReport(comment: any, author: number, author_name: string) {
    this.commentUserData = {
      commentId: comment.id,
      author: comment.author,
      author_name: comment.author_name,
      comment_content: comment.content.rendered,
      reporter: this.authService.getUserName()
    }
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

  animateComments() {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.platformId);
      const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.5
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targetElement = entry.target as HTMLElement;
            const classesToAdd = ['animate-fade-up', 'animate-fill-forwards', 'animate-normal', 'animate-once','animate-duration-200', 'animate-ease-linear'];
            targetElement.classList.add(...classesToAdd);
            observer.unobserve(targetElement);
          }
        });
      }, options);
      const elementsToObserve = document.querySelectorAll('.comment-container');

      elementsToObserve.forEach(element => {
        observer.observe(element);
      });
    }
  }

  getComments(page: number) {
    this.commentsSub = this.commentsService.getComments(this.postId, this.commentPage).subscribe({
      next: comments => {
        // const newComments = comments.filter((comment: any) => !this.comments.some((existingComment: any) => existingComment.id === comment.id));
        // this.comments.unshift(...newComments);
        this.animateComments();
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
