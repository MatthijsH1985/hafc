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
import * as moment from 'moment';

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
  headlines: any;
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
    this.viewportScroller.scrollToPosition([0, 0]);
    this.headlines = this.route.snapshot.data['headlines'].slice(0,1)[0];
    this.posts = this.route.snapshot.data['posts'];
    this.links = this.route.snapshot.data['links'];
    this.loading = false;

    this.latestComments = this.route.snapshot.data['latestComments'];
    this.metaService.setMetaTag('https://www.hafc.nl', 'HAFC.nl is de grootste Heracles community voor en door supporters. Volg hier het laatste nieuws over Heracles en blijf op de hoogte', 'https://backend.hafc.nl/wp-content/uploads/2023/05/nac-heracles.jpg');
    this.metaService.updateMetaTag('HAFC.nl - Wij zijn Heracles', 'https://www.hafc.nl', 'HAFC.nl is de grootste Heracles community voor en door supporters. Volg hier het laatste nieuws over Heracles en blijf op de hoogte');
  }

  onShowDonateMessage() {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.info(
        '<p>Kun jij een kleine bijdrage missen voor het komende jaar? HAFC wil jullie ook dit jaar weer voorzien van het laatste nieuws!</p> <a class="block mt-2 -ml-2 underline text-black p-2" href="https://hafcnl.backme.org/" target="_blank">Ja, ik steun HAFC</a>',
        'Help HAFC.nl', {
          enableHtml: true,
          timeOut: 10000,
          closeButton:true
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
