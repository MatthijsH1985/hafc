import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../services/posts.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss']
})
export class NewslistComponent implements OnInit {
  @Input('pagination') pagination: boolean = true;
  @Input('compact') compact: boolean = false;
  postsSub: Subscription | undefined;
  loading: boolean = true;
  postPage: any = 1;
  errorMessage: any;
  posts: any = [];

  constructor(private postsService: PostsService, private loadingIndicatorService: LoadingIndicatorService) {
  }

  showLoading(): void {
    this.loadingIndicatorService.setLoading(true);
  }

  hideLoading(): void {
    this.loadingIndicatorService.setLoading(false);
  }

  ngOnInit() {
    this.getPosts(1);
  }

  getPosts(page: number): void {
    this.loading = true;
    this.postsSub = this.postsService.getPosts(this.postPage).subscribe({
      next: (data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.posts.push(data[i]);
        }
        this.loading = false;
        this.postPage++;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onLoadMorePosts() {
    this.getPosts(this.postPage);
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }
}
