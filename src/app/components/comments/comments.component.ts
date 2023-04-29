import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {Subscription} from "rxjs";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {
  commentsSub: Subscription | undefined;
  @Input() postId: string | undefined;
  @Input() onReloadComments: boolean = false;
  comments: any = [];
  commentPage = 1;
  commentsOrder = 'desc';
  loading: boolean = true;
  noCommentsMessage = 'Er is (nog) niet gereageerd op dit artikel';
  loadingComments: boolean = true;
  noCommentsLoaded = true;
  faCheck = faCheck;

  constructor(private commentsService: CommentsService) {

  }

  ngOnInit() {
    this.getComments();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['onReloadComments'] && !changes['onReloadComments'].firstChange) {
      this.getComments();
    }
  }

  getComments() {
    this.commentsService.getComments(this.postId).subscribe({
      next: comments => {
        this.comments = comments;
        this.loadingComments = false;
        this.noCommentsLoaded = false;
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
}
