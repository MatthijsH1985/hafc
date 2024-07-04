import { SwiperOptions } from "swiper";
import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";
import Swiper from 'swiper';

@Directive({
  selector: '[fmSwiper]',
  standalone: true
})
export class SwiperDirective implements AfterViewInit {

  @Input('config')
  config?: SwiperOptions;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (this.config) {
      new Swiper(this.el.nativeElement, this.config);
    }
  }
}
