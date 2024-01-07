import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {CommentsService} from '../services/comments.service';
import * as moment from 'moment/moment';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-latest-comments',
  templateUrl: './latest-comments.component.html',
  styleUrls: ['./latest-comments.component.scss']
})
export class LatestCommentsComponent implements AfterViewInit {
  @Input('comments') latestComments: any | undefined;
  @Input('post') post: any | undefined

  constructor(private loadingIndicatorService: LoadingIndicatorService,
              private commentsService: CommentsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngAfterViewInit() {
    if (this.post) {
      this.commentsService.getLatestComments(this.post.id).subscribe({
        next: (comments: any) => {
          this.latestComments = comments;
        },
        error: (error: any) => {
          console.log('Er is een fout opgetreden');
        }
      })
    }
  }

  calculateTimeDifference(startDate: string): string {
    return moment(startDate).fromNow();
  }

  navigateToFragment(fragment: string): void {
    console.log('fragment')
    // this.router.navigate([], {
    //   fragment: 'comment-' + fragment,
    //   relativeTo: this.route
    // });
    setTimeout(() => {
      this.scrollToElement('comment-' + fragment);
    }, 100);
  }

  onShowLoading(): void {
    // this.loadingIndicatorService.setLoading(true);
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      return dateString.replace(/\s/, 'T');
    }
    return null;
  }

  private scrollToElement(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      const offset = 120; // Pas dit aan naar de gewenste offsetwaarde
      const elementRect = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  getSlug(commentLink: any, postId: number) {
    const baseUrl = `https://backend.hafc.nl/nieuws/${postId}`;
    const slug = commentLink.replace(baseUrl, '').replace(/\//g, '');;
    return slug;
  }

  shortenComment(comment: string) {
    return comment.slice(0, 60) + '...';
  }

}
