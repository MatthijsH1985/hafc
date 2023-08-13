import {Component, Inject, Injector, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {isPlatformBrowser, ViewportScroller} from "@angular/common";
import {NewssliderComponent} from "../../news/newsslider/newsslider.component";
import {MetaService} from "../../core/services/meta.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {PlayersService} from "../../services/players.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts: any = [];
  loading = true;
  constructor(
              private titleService: Title,
              private playersService: PlayersService,
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

  get newssliderComponent() {
    return NewssliderComponent;
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
