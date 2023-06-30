import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ViewportScroller} from "@angular/common";
import {AdsService} from "../../services/ads.service";
import { Platform } from '@angular/cdk/platform';
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

  constructor(private postsService: PostsService,
              private adsService: AdsService,
              private router: Router,
              private titleService: Title,
              private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {
    this.titleService.setTitle('HAFC - Wij zijn Heracles!');
    this.viewportScroller.scrollToPosition([0, 0]);
    this.getPosts();
  }

  getPosts() {
    this.loading = true;
    this.postsSub = this.postsService.getPosts(this.postPage).subscribe({
      next: data => {
        for (let i = 0; i < data.length; i++) {
          this.posts.push(data[i]);
        }
        this.headline = this.posts[0];
        this.loading = false;
        this.postPage++;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }
}
