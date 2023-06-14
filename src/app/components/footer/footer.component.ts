import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {AdsService} from "../../services/ads.service";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  buttonVisible: boolean = false;
  links: any = [];
  faArrowUp: any = faArrowUp;
  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isButtonVisible(winScroll);
  }

  constructor(private viewportScroller: ViewportScroller, private linkService: AdsService) {
  }

  ngOnInit(){
    this.linkService.getLinks(809).subscribe({
      next: links => {
        this.links = links;
      },
      error: error => {
        console.log(error);
      }
    })
  }
  isButtonVisible(scrollHeight: number): void {
    this.buttonVisible = (scrollHeight > 1000) ? true : false
  }
  toTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
