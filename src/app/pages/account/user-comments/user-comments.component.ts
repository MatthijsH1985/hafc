import {Component, OnInit} from '@angular/core';
import {CommentsService} from "../../../services/comments.service";

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit{

  comments: any = [];
  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.commentsService.getCommentsByUserId(1121).subscribe((results) => {
      this.comments = results;
    }, error => {
      console.log(error);
    });
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      return dateString.replace(/\s/, 'T');
    }
    return null;
  }

}
