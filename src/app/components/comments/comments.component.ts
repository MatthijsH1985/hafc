import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {Subscription} from "rxjs";
import {faCheck, faBell} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges, OnDestroy {
  commentsSub: Subscription | undefined;
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
  newCommentCount: number = 0;

  constructor(private commentsService: CommentsService) {
    this.commentsService.newCommentAdded$.subscribe((newComment) => {
      this.comments.unshift(newComment);
    });
  }

  ngOnInit() {
    this.getComments(1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['onReloadComments'] && !changes['onReloadComments'].firstChange) {
      this.getComments(this.commentPage);
    }
  }

  getComments(page: number) {
    this.commentsSub = this.commentsService.getComments(this.postId, this.commentPage).subscribe({
      next: comments => {
        for (let i = 0; i < comments.length; i++) {
          this.comments.push(comments[i]);
        }
        this.loadingComments = false;
        this.noCommentsLoaded = false;
        this.commentPage++;
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
  }

}
