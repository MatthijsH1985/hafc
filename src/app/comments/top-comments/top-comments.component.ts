import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class TopCommentsComponent implements OnInit {
  @Input('comments') topComments: any | undefined;
  @Input('post') post: any | undefined;
  @Output() goToFragment = new EventEmitter();

  constructor(
              private commentsService: CommentsService) {
  }

  ngOnInit() {
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

  protected readonly faTrophy = faTrophy;
}
