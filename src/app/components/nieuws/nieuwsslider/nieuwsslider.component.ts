import {
  AfterViewInit,
  Component,
  ElementRef, Inject,
  Input,
  ViewChild,
} from '@angular/core';
import Swiper, {
  A11y,
  Mousewheel,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper'
import {Subscription} from "rxjs";
import {PostsService} from "../../../services/posts.service";

@Component({
  selector: 'app-nieuwsslider',
  templateUrl: './nieuwsslider.component.html',
  styleUrls: ['./nieuwsslider.component.scss']
})

export class NieuwssliderComponent implements AfterViewInit {
  postsSub: Subscription;
  // public config: SwiperOptions = {
  //   modules: [Navigation, Pagination, A11y, Mousewheel],
  //   zoom: {
  //     maxRatio: 5,
  //   },
  //   autoHeight: false,
  //   spaceBetween: 20,
  //   navigation: {
  //     prevEl: '.prev-button',
  //     nextEl: '.next-button',
  //   },
  //   pagination: false,
  //   slidesPerView: 1,
  //   centeredSlides: true,
  //   grabCursor: true,
  //   effect: "creative",
  //   creativeEffect: {
  //     prev: {
  //       shadow: true,
  //       translate: ["-20%", 0, -1],
  //     },
  //     next: {
  //       translate: ["100%", 0, 0],
  //     },
  //   },
  // }
  @Input('headline') headline: any;
  // @ViewChild('swiper') swiper: ElementRef | undefined

  constructor(@Inject('isBrowser') private isBrowser: boolean, private postsService: PostsService) {
    this.postsSub = new Subscription()
  }

  ngAfterViewInit() {
    // Object.assign(this.swiper.nativeElement, this.config)
    if(this.isBrowser) {
      if (this.isBrowser) {
        // this.swiper.nativeElement.initialize();
      }
    }
  }

  onSlideChange(event: any) {
    console.log(event);
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }

}
