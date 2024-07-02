import {ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {isPlatformBrowser, ViewportScroller} from "@angular/common";
import {NewssliderComponent} from "../../news/newsslider/newsslider.component";
import {MetaService} from "../../core/services/meta.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {Link} from "../../core/model/link.interface";
import {ToastrService} from "ngx-toastr";
import {AuthService} from '../../services/auth/auth-service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
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
              private toastr:ToastrService,
              private authService: AuthService,
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

    if (!this.isAuthenticated()) {
      let donateTitle = 'BELANGRIJKE MEDEDELING!';
      let donateMessage = '<p>Kun jij een kleine bijdrage missen voor het komende jaar? HAFC wil jullie ook dit jaar weer voorzien van het laatste nieuws!</p> <a class="block mt-2 -ml-2 underline text-black p-2" href="https://www.hafc.nl/doneer" target="_blank">Ja, ik steun HAFC met een eenmalige donatie</a>';
      // this.onShowDonateMessage(donateTitle, donateMessage);
    } else {
      let donateTitle = 'BELANGRIJKE MEDEDELING VOOR ' + this.authService.getUserName();
      let donateMessage = '<p>Kun jij een kleine bijdrage missen voor het komende jaar? HAFC wil jullie ook dit jaar weer voorzien van het laatste nieuws!</p> <a class="block mt-2 -ml-2 underline text-black p-2" href="https://www.hafc.nl/doneer" target="_blank">Ja, ik steun HAFC met een eenmalige donatie</a>';
      // this.onShowDonateMessage(donateTitle, donateMessage);
    }
    this.animateProgressBar();
    this.startCounting();
    this.latestComments = this.route.snapshot.data['latestComments'];
    this.metaService.setMetaTag('https://www.hafc.nl', 'HAFC.nl is de grootste Heracles community voor en door supporters. Volg hier het laatste nieuws en blijf op de hoogte', 'https://backend.hafc.nl/wp-content/uploads/2023/05/nac-heracles.jpg');
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onShowDonateMessage(donateTitle: string, donateMessage: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.error(
        donateMessage,
        donateTitle, {
          enableHtml: true,
          timeOut: 10000,
          closeButton:true
        })
    }
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

  showDonationNotification(): any {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('donationNotification') === 'hidden' || localStorage.getItem('donationNotification') === 'hide') {
        return true;
      } else {
        return false;
      }
    }
  }

  showDonationPage():any {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('donationPage') === 'hidden' || localStorage.getItem('donationPage') === 'hide') {
        return false;
      } else {
        return true;
      }
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
