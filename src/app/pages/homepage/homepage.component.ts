import {Component, Inject, Injector, OnInit, PLATFORM_ID} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {isPlatformBrowser, ViewportScroller} from "@angular/common";
import {AdsService} from "../../ads/services/ads.service";
import {PostsService} from "../../news/services/posts.service";
import {NewssliderComponent} from "../../news/newsslider/newsslider.component";
import {MetaService} from "../../core/services/meta.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";

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

  constructor(
              private titleService: Title,
              private viewportScroller: ViewportScroller,
              private metaService: MetaService,
              private injector: Injector,
              private loadingIndicatorService: LoadingIndicatorService,
              private route: ActivatedRoute,
              @Inject('isBrowser') @Inject(PLATFORM_ID) private platformId: Object) {
  }

  get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  showLoading(): void {
    this.loadingIndicatorService.setLoading(true);
  }

  hideLoading(): void {
    this.loadingIndicatorService.setLoading(false);
  }

  get newssliderComponent() {
    return NewssliderComponent;
  }

  get customInjector() {
    return Injector.create({
      providers: [
        {
          provide: 'headlines',
          useValue: this.headlines }
      ],
      parent: this.injector,
    });
  }

  ngOnInit() {
    this.titleService.setTitle('HAFC - Wij zijn Heracles!');
    this.viewportScroller.scrollToPosition([0, 0]);
    this.metaService.setMetaTag('HAFC.nl - Wij Zij Heracles', 'HAFC.nl is de grootste Heracles community voor en door supporters');
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }
}
