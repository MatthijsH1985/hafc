import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {CommentsService} from '../services/comments.service';
import moment from 'moment/moment';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../core/core.module';

@Component({
  selector: 'app-top-comments',
  templateUrl: './top-comments.component.html',
  styleUrls: ['./top-comments.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class TopCommentsComponent implements AfterViewInit {
  @Input('comments') topComments: any | undefined;
  @Input('post') post: any | undefined;
  @Output() goToFragment = new EventEmitter();

  constructor(private loadingIndicatorService: LoadingIndicatorService,
              private commentsService: CommentsService) {
  }

  ngAfterViewInit() {
    if (this.post) {
      this.commentsService.getPopularComments(this.post.id).subscribe({
        next: (comments: any) => {
          this.topComments = comments;
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }
  }

  calculateTimeDifference(startDate: string): string {
    return moment(startDate).fromNow();
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      return dateString.replace(/\s/, 'T');
    }
    return null;
  }

  shortenComment(comment: string) {
    return comment.slice(0, 60) + '...';
  }

  protected readonly faTrophy = faTrophy;
}
