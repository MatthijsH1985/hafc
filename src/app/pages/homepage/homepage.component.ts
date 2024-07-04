import {ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {isPlatformBrowser, ViewportScroller} from "@angular/common";
import {NewssliderComponent} from "../../components/newsslider/newsslider.component";
import {MetaService} from "../../core/services/meta.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {Link} from "../../core/model/link.interface";
import {AdsComponent} from '../../ads/ads/ads.component';
import {VolgendeWedstrijdComponent} from '../competition/volgende-wedstrijd/volgende-wedstrijd.component';
import {CoreModule} from '../../core/core.module';
import {NewsModule} from '../../news/news.module';
import {StandComponent} from '../competition/stand/stand.component';
import {ToastrModule} from 'ngx-toastr';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  imports: [
    AdsComponent,
    VolgendeWedstrijdComponent,
    CoreModule,
    NewsModule,
    StandComponent,
    Button
  ],
  standalone: true
})
export class HomepageComponent implements OnInit {
  posts: any = [];
  latestComments: any = [];
  loading = true;
  links: Link[] = [];
  reactiesString = 'reacties';
  headlines: any;
  targetWidth = 99; // The target percentage width
  totalDuration = 2000; // Total duration of the animation and counting in milliseconds
  animationDuration = 2000; // Duration of the animation in milliseconds
  countingInterval = 10; // Interval for counting in milliseconds
  currentWidth = 0;
  currentPercentage = 0;
  constructor(
              private titleService: Title,
              private viewportScroller: ViewportScroller,
              private metaService: MetaService,
              private cdr: ChangeDetectorRef,
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
    this.titleService.setTitle('HAFC - Wij zijn Heracles');
    this.viewportScroller.scrollToPosition([0, 0]);
    this.headlines = this.route.snapshot.data['headlines'].slice(0,1)[0];
    if (this.headlines.comments_count === 0) {
      this.reactiesString = 'reactie';
    }
    this.posts = this.route.snapshot.data['posts'];
    this.links = this.route.snapshot.data['links'];
    this.loading = false;

    this.animateProgressBar();
    this.startCounting();
    this.latestComments = this.route.snapshot.data['latestComments'];
    this.metaService.setMetaTag('https://www.hafc.nl', 'HAFC.nl is de grootste Heracles community voor en door supporters. Volg hier het laatste nieuws en blijf op de hoogte', 'https://backend.hafc.nl/wp-content/uploads/2023/05/nac-heracles.jpg');
  }

  animateProgressBar(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const interval = 20; // Update interval in milliseconds
        const animationSteps = this.animationDuration / interval;
        let step = 0;

        const updateProgress = () => {
          step++;
          const progress = step / animationSteps;
          this.currentWidth = progress * this.targetWidth;

          this.cdr.detectChanges(); // Manually trigger change detection

          if (step < animationSteps) {
            setTimeout(updateProgress, interval);
          } else {
            // Ensure the final state is exactly the target
            this.currentWidth = this.targetWidth;
            this.cdr.detectChanges(); // Final change detection
          }
        };

        setTimeout(updateProgress, interval);
      }, 2000)
    }
  }

  startCounting(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const countingSteps = this.totalDuration / this.countingInterval;
        let step = 0;

        const updateCount = () => {
          step++;
          const progress = step / countingSteps;
          this.currentPercentage = Math.round(progress * this.targetWidth);

          this.cdr.detectChanges(); // Manually trigger change detection

          if (step < countingSteps) {
            setTimeout(updateCount, this.countingInterval);
          } else {
            // Ensure the final state is exactly the target
            this.currentPercentage = this.targetWidth;
            this.cdr.detectChanges(); // Final change detection
          }
        };
        setTimeout(updateCount, this.countingInterval);
      }, 2000)
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
