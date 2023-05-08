import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ViewportScroller} from "@angular/common";
import {AdsService} from "../../services/ads.service";

// @ts-ignore
import * as _ from "lodash";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts: any = [];
  postPage = 1;
  loading = true;
  headlines: any = [];
  postsSub: Subscription | undefined;
  adsSub: Subscription | undefined;
  adsCategoryId: number = 804;
  ads: any | undefined = [];
  randomizedAds: any | undefined;

  constructor(private postsService: PostsService,
              private adsService: AdsService,
              private router: Router,
              private titleService: Title,
              private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {
    this.getPosts(false, '');
    this.getAds(this.adsCategoryId);
    this.titleService.setTitle('HAFC - Wij zijn Heracles!');
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  getAds(categoryId: number) {
    this.adsSub = this.adsService.getAds(categoryId).subscribe({
        next: ads => {
          this.randomizeAds(ads);
        },
        error: error => {
          console.log(error)
        }
      }
    )
  }

  randomizeAds(ads: any) {
    this.randomizedAds  = _.sampleSize(ads, 4);
    setInterval(() => {
      const adsRandimized = _.sampleSize(ads, 4);
      this.randomizedAds = adsRandimized;
    }, 15000)
  }

  getPosts(isFirstLoad: any, event: any): void {
    this.postsSub = this.postsService.getPosts(this.postPage).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        this.posts.push(data[i]);
      }
      this.headlines = this.posts.slice(0,3);

      if (isFirstLoad) {
        event.target.complete();
      }
      this.loading = false;
      this.postPage++;

    }, error => {
      console.log(error);
    });
  }

  openPost(post: any): void {
    this.router.navigateByUrl(`nieuws/${post.id}`);
  }
}
