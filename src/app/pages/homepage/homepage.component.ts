import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ViewportScroller} from "@angular/common";
import {AdsService} from "../../services/ads.service";
import { Platform } from '@angular/cdk/platform';

// @ts-ignore
import * as _ from "lodash";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts: any = [];
  postPage = 1;
  loading = true;
  headline: any = [];
  postsSub: Subscription | undefined;
  adsSub: Subscription | undefined;
  adsCategoryId: number = 804;
  ads: any | undefined = [];
  randomizedAds: any | undefined;

  constructor(private postsService: PostsService,
              private adsService: AdsService,
              private router: Router,
              private titleService: Title,
              private viewportScroller: ViewportScroller,
              private platform: Platform) {
  }

  ngOnInit() {
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
          console.error(error);
        }
      }
    )
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }

  randomizeAds(ads: any) {
    this.randomizedAds  = _.sampleSize(ads, 4);
    if (this.platform.isBrowser) {
      setInterval(() => {
        const adsRandimized = _.sampleSize(ads, 4);
        this.randomizedAds = adsRandimized;
      }, 15000)
    }
  }

  openPost(post: any): void {
    this.router.navigateByUrl(`nieuws/${post.id}`);
  }
}
