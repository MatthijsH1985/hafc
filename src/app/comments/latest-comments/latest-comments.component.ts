import {Component, Input, OnInit} from '@angular/core';
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";

@Component({
  selector: 'app-latest-comments',
  templateUrl: './latest-comments.component.html',
  styleUrls: ['./latest-comments.component.scss']
})
export class LatestCommentsComponent {
  @Input('comments') latestComments: any;

  constructor(private loadingIndicatorService: LoadingIndicatorService) {
  }

  onShowLoading(): void {
    this.loadingIndicatorService.setLoading(true);
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
