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
import {CommentsService} from "../../services/comments.service";
import {Subscription} from "rxjs";
import {faCheck, faBell} from "@fortawesome/free-solid-svg-icons";
import { isPlatformBrowser} from '@angular/common';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges, OnDestroy {
  commentsSub: Subscription | undefined;
  commentsCountSub: Subscription | undefined;
  @Input() postId: string | undefined;
  @Input() onReloadComments: boolean = false;
  comments: any = [];
  loading: boolean = true;
  noCommentsMessage = 'Er is (nog) niet gereageerd op dit artikel';
  loadingComments: boolean = true;
  noCommentsLoaded = true;
  faCheck = faCheck;
  commentPage: number = 1;
  faBell = faBell;
  commentCount: number = 0;
  newCommentCount: number = 0;
  reloadButtonVisible: any;
   @Input() initialCommentCount: number = 0;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isNewCommentsButtonVisible(winScroll);
  }

  constructor(private commentsService: CommentsService, private changeDetectorRef: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: object) {
    this.commentsService.newCommentAdded$.subscribe((newComment) => {
      this.comments.unshift(newComment);
    });
  }

  isNewCommentsButtonVisible(scrollHeight: number): void {
    this.reloadButtonVisible = scrollHeight > 2000 ? true : false;
  }

  ngOnInit() {
    this.getComments(1);
    // if (isPlatformBrowser(this.platformId)) {
    //   setInterval(() => {
    //     this.checkForNewComments();
    //   }, 5000)
    // }
  }

  checkForNewComments() {
    if (this.commentsCountSub && !this.commentsCountSub.closed) {
      return;
    } else {
      this.commentsCountSub = this.commentsService.getCommentsCount(this.postId).subscribe({
        next: (data: any) => {
          const commentCount = data.count;
          console.log('Totaal aantal reacties: ' + commentCount);

          // Bereken het aantal nieuwe reacties
          const newCommentCount = commentCount - this.initialCommentCount;
          console.log('Op te halen reacties: ' + newCommentCount);

          // Update this.newCommentCount met het nieuwe aantal
          this.newCommentCount = newCommentCount;
          this.closeNewCommentsSubscription();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  closeNewCommentsSubscription() {
    this.commentsCountSub?.unsubscribe();
  }

  loadNewComments() {
    this.commentPage = 1;
    this.getComments(1);
    this.newCommentCount = 0;
    console.log(this.newCommentCount);
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
        console.log(this.comments);
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
