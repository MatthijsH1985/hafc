import {
  AfterViewInit,
  Component, CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, Inject,
  PLATFORM_ID,
  ViewChild, ViewEncapsulation,
} from '@angular/core';
import Swiper, {
  SwiperOptions,
} from 'swiper'
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {SwiperDirective} from "../../core/shared/slider.directive";
import {PostsService} from "../../news/services/posts.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {faChevronLeft, faChevronRight, faLongArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CoreModule} from '../../core/core.module';

@Component({
  selector: 'app-newsslider',
  templateUrl: './newsslider.component.html',
  styleUrls: ['./newsslider.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
    imports: [
        RouterModule,
        SwiperDirective,
        FontAwesomeModule,
        CoreModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class NewssliderComponent implements AfterViewInit {
  public config: SwiperOptions = {
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ["-20%", 0, -1],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    pagination: {
      el: '.custom-pagination',
      type: 'custom',
      renderCustom: function (swiper: any, current: any, total: any) {
        let paginationHTML = '';

        for (let i = 0; i < total; i++) {
          paginationHTML += `<span class="swiper-pagination-line ${current - 1 === i ? 'active' : ''}"></span>`;
        }
        return paginationHTML;
      },
    },
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
  }
  @ViewChild('swiper') swiper: ElementRef | undefined;
  posts: any = [];
  public activeSlideIndex: number = 0;

  constructor(
    private postsService: PostsService,
    private loadingIndicatorService: LoadingIndicatorService,
    private route: ActivatedRoute,
    @Inject('isBrowser') @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('isBrowser') private isBrowser: boolean
  ) {
    this.posts = this.route.snapshot.data['posts'].slice(0,3);
  }

  showLoading(): void {
    this.loadingIndicatorService.setLoading(true);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.swiper?.nativeElement) {
      new Swiper(this.swiper.nativeElement, this.config);
      if (this.isBrowser) {
        this.swiper.nativeElement.initialize();
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

  protected readonly faChevronLeft = faChevronLeft;
  protected readonly faChevronRight = faChevronRight;
  protected readonly faLongArrowRight = faLongArrowRight;
}
