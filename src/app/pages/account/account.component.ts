import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {GtmService} from "../../services/gtm.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent  implements OnInit{
  constructor(private viewportScroller: ViewportScroller, private gtmService: GtmService) {

  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
    this.gtmService.startTrackingTags();
  }
}
