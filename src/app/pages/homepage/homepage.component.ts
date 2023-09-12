import {Component, Inject, Injector, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {isPlatformBrowser, ViewportScroller} from "@angular/common";
import {NewssliderComponent} from "../../news/newsslider/newsslider.component";
import {MetaService} from "../../core/services/meta.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {PlayersService} from "../../services/players.service";
import {Link} from "../../core/model/link.interface";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts: any = [];
  latestComments: any = [];
  loading = true;
  links: Link[] = [];
  constructor(
              private titleService: Title,
              private playersService: PlayersService,
              private viewportScroller: ViewportScroller,
              private metaService: MetaService,
              private toastr:ToastrService,
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
    this.onShowDonateMessage();
    this.viewportScroller.scrollToPosition([0, 0]);
    this.posts = this.route.snapshot.data['posts'];
    this.links = this.route.snapshot.data['links'];
    this.latestComments = this.route.snapshot.data['latestComments'];
    this.metaService.setMetaTag('HAFC.nl - Wij Zij Heracles', 'HAFC.nl is de grootste Heracles community voor en door supporters');
  }

  onShowDonateMessage() {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.error('<a href="https://hafcnl.backme.org/#support" target="_blank">Steun ons dan nu. Het is nodig.</a>', 'Vind jij het belangrijk dat HAFC blijft bestaan?!', {
        positionClass: 'toast-top-center',
        enableHtml: true,
        timeOut: 12000
      })
    }
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }
}
