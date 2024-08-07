import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router, RouterModule} from "@angular/router";
import {PostsService} from "../../news/services/posts.service";
import {MetaService} from "../../core/services/meta.service";
import {LoadingIndicatorService} from '../../core/shared/loading-indicator/loading-indicator.service';
import {CoreModule} from '../../core/core.module';
import {LoadingIndicatorComponent} from '../../core/shared/loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CoreModule,
    LoadingIndicatorComponent
  ]
})
export class SpecialsComponent implements OnInit {
  posts: any = [];
  headline: any;
  postPage = 1;
  loading = true;
  postsSub: Subscription | undefined;
  constructor(private postsService: PostsService, private loadingIndicatorService: LoadingIndicatorService, private router: Router, private metaService: MetaService) {}

  ngOnInit() {
    this.getPosts();
    this.metaService.updateMetaTag('Specials - HAFC.nl', this.router.url, 'Exclusieve interviews en andere unieke specials lees je op HAFC.nl');
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }

  showLoading(): void {
    this.loadingIndicatorService.setLoading(true);
  }

  getPosts(page = 1): void {
    this.postsSub = this.postsService.getPosts(page, [816]).subscribe( {
      next: (data: any) => {
        for (let i = 0; i < data.length; i++) {
          // @ts-ignore
          this.posts.push(data[i]);
        }
        this.headline = this.posts[0];
        this.loading = false;
        this.postPage++;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  onLoadMorePosts() {
    this.getPosts(this.postPage);
  }

}
