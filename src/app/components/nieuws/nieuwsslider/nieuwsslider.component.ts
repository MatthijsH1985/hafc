import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Swiper, {
  A11y,
  Mousewheel,
  Navigation,
  Pagination,
  EffectCreative,
  SwiperOptions,
} from 'swiper'

@Component({
  selector: 'app-nieuwsslider',
  templateUrl: './nieuwsslider.component.html',
  styleUrls: ['./nieuwsslider.component.scss']
})

export class NieuwssliderComponent implements AfterViewInit {
  public config: SwiperOptions = {
    modules: [Navigation, Pagination, A11y, Mousewheel],
    zoom: {
      maxRatio: 5,
    },
    autoHeight: false,
    spaceBetween: 20,
    navigation: {
      prevEl: '.prev-button',
      nextEl: '.next-button',
    },
    pagination: true,
    slidesPerView: 1,
    centeredSlides: true,
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
  @Input('headlines') headlines: any;
  @ViewChild('swiper') swiper: ElementRef | undefined

  constructor() {

  }

  ngAfterViewInit() {
    // @ts-ignore
    Object.assign(this.swiper.nativeElement, this.config)
    // @ts-ignore
    this.swiper.nativeElement.initialize()
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
