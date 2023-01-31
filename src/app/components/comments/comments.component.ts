import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from "../../services/comments.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{
  commentsSub: Subscription | undefined;
  @Input() postId: string | undefined;
  comments: any = [];
  commentPage = 1;
  commentsOrder = 'desc';
  loading: boolean = true;
  noCommentsMessage = 'Er is (nog) niet gereageerd op dit artikel';
  noComments: boolean = true;

  constructor(private commentsService: CommentsService) {

  }

  ngOnInit() {
    this.getComments(false, event, this.commentsOrder);
  }

  getComments(isFirstLoad: any, event: any, order: string) {

    this.commentsService.getComments(this.postId).subscribe({
      next: comments => {
        this.comments = comments;
      },
      error:error => {
        console.log(error)
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
