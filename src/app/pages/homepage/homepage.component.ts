import {Component, Inject, Injector, OnInit, PLATFORM_ID} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {isPlatformBrowser, ViewportScroller} from "@angular/common";
import {AdsService} from "../../services/ads.service";
import {MetaService} from "../../services/meta.service";
import {PostsService} from "../../news/services/posts.service";
import {NewssliderComponent} from "../../news/newsslider/newsslider.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts: any = [];
  postPage = 2;
  loading = true;
  headlines: any = [];
  postsSub: Subscription | undefined;

  constructor(private postsService: PostsService,
              private adsService: AdsService,
              private router: Router,
              private titleService: Title,
              private viewportScroller: ViewportScroller,
              private metaService: MetaService,
              private injector: Injector,
              private route: ActivatedRoute,
              @Inject('isBrowser') @Inject(PLATFORM_ID) private platformId: Object) {
  }

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  get newssliderComponent() {
    return NewssliderComponent;
  }

  ngOnInit() {
    this.titleService.setTitle('HAFC - Wij zijn Heracles!');
    this.viewportScroller.scrollToPosition([0, 0]);
    // this.getPosts();
    this.metaService.setMetaTag('HAFC.nl - Wij Zij Heracles', 'HAFC.nl is de grootste Heracles community voor en door supporters');
  }

  getPosts() {
    this.loading = true;
    this.postsSub = this.postsService.getPosts(this.postPage).subscribe({
      next: (data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.posts.push(data[i]);
        }
        this.headlines = this.posts.slice(0,3);
        this.loading = false;
        this.postPage++;
      },
      error: (error: any) => {
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
