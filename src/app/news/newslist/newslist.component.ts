import {Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../services/posts.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss']
})
export class NewslistComponent implements OnInit, OnDestroy {
  @Input('pagination') pagination: boolean = true;
  @Input('compact') compact: boolean = false;
  posts: any = [];
  postsSub: Subscription | undefined;
  loading: boolean = true;
  postPage: any = 1;
  errorMessage: any;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private loadingIndicatorService: LoadingIndicatorService) {
  }

  showLoading(): void {
    this.loadingIndicatorService.setLoading(true);
  }

  ngOnInit() {
    this.posts = this.route.snapshot.data['posts'];
  }

  getPosts(page: number): void {
    this.loading = true;

    this.postsSub = this.postsService.getPosts(page).subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            this.posts.push(data[i]);
          }
          this.loading = false;
          this.postPage++;
        } else {
          console.log("Invalid data received:", data);
        }
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

  ngOnDestroy() {
    if (this.postsSub) {
      // this.postsSub.unsubscribe();
    }
  }


}
