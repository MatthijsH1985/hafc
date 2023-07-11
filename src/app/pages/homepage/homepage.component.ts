import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ViewportScroller} from "@angular/common";
import {AdsService} from "../../services/ads.service";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {GtmService} from "../../services/gtm.service";
import {MetaService} from "../../services/meta.service";

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

  constructor(private postsService: PostsService,
              private adsService: AdsService,
              private router: Router,
              private titleService: Title,
              private viewportScroller: ViewportScroller,
              private gtmService: GtmService,
              private metaService: MetaService) {
  }

  ngOnInit() {
    this.titleService.setTitle('HAFC - Wij zijn Heracles!');
    this.viewportScroller.scrollToPosition([0, 0]);
    this.getPosts();
    this.gtmService.startTrackingTags();
    this.metaService.setMetaTag('HAFC.nl - Wij Zij Heracles', 'HAFC.nl is de grootste Heracles community voor en door supporters');
  }

  getPosts() {
    this.loading = true;
    this.postsSub = this.postsService.getPosts(this.postPage).subscribe({
      next: data => {
        for (let i = 0; i < data.length; i++) {
          this.posts.push(data[i]);
        }
        this.headlines = this.posts.slice(0,3);
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
