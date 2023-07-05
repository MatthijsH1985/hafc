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
import {Subscription} from "rxjs";
import {PostsService} from "../../../services/posts.service";
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {SwiperDirective} from "../../../shared/slider.directive";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-nieuwsslider',
  templateUrl: './nieuwsslider.component.html',
  styleUrls: ['./nieuwsslider.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    RouterModule,
    SwiperDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class NieuwssliderComponent implements AfterViewInit {
  postsSub: Subscription;
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
  }
  @Input('headlines') headlines: any | undefined;
  @ViewChild('swiper') swiper: ElementRef | undefined

  constructor(@Inject('isBrowser') private isBrowser: boolean) {
    this.postsSub = new Subscription()
  }

  ngAfterViewInit() {
    // @ts-ignore
    new Swiper(this.swiper.nativeElement, this.config);
    // Object.assign(this.swiper.nativeElement, this.config)
    if (this.isBrowser) {
      console.log(this.swiper);
      // @ts-ignore
      this.swiper.nativeElement.initialize();
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
