import {
  AfterViewInit,
  Component, CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, Inject,
  Input, OnInit, PLATFORM_ID,
  ViewChild, ViewEncapsulation,
} from '@angular/core';
import Swiper, {
  A11y,
  Mousewheel,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper'
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SwiperDirective} from "../../core/shared/slider.directive";
import {PostsService} from "../services/posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-newsslider',
  templateUrl: './newsslider.component.html',
  styleUrls: ['./newsslider.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterModule,
    SwiperDirective
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
    }
  }
  // @Input('headlines') headlines: any | undefined;
  @ViewChild('swiper') swiper: ElementRef | undefined;
  postsSub: Subscription | undefined;
  posts: any = [];
  headlines: any = [];
  public activeSlideIndex: number = 0;

  constructor(
    private postsService: PostsService,
    @Inject('isBrowser') @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('isBrowser') private isBrowser: boolean
  ) {
    // ...
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postsSub = this.postsService.getPosts().subscribe({
      next: (data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.posts.push(data[i]);
        }
        this.headlines = this.posts.slice(0,3);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.swiper?.nativeElement) {
      new Swiper(this.swiper.nativeElement, this.config);
      if (this.isBrowser) {
        this.swiper.nativeElement.initialize();
      }
    }
  }

  public onSwiper(swiper: any) {
    swiper.on('slideChange', () => {
      this.activeSlideIndex = swiper.activeIndex;
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
