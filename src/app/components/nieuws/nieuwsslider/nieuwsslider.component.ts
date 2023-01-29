import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, {Pagination, Navigation, SwiperOptions} from "swiper";
import Swiper from "swiper";
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-nieuwsslider',
  templateUrl: './nieuwsslider.component.html',
  styleUrls: ['./nieuwsslider.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NieuwssliderComponent {
  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    observer: true,
    observeParents: true
  }
  @Input('headlines') headlines: any;

  constructor(private swiper: Swiper) {
  }

}
