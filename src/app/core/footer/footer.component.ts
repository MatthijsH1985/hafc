import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {AdsService} from "../../ads/services/ads.service";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  buttonVisible: boolean = false;
  faArrowUp: any = faArrowUp;
  @Input('links') links: any;
  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isButtonVisible(winScroll);
  }

  constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller, private linkService: AdsService) {
  }

  ngOnInit(){

  }
  isButtonVisible(scrollHeight: number): void {
    this.buttonVisible = (scrollHeight > 1000) ? true : false
  }
  toTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
