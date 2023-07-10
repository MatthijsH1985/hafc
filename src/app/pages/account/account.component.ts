import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {NavigationEnd, Router} from "@angular/router";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent  implements OnInit{
  constructor(private viewportScroller: ViewportScroller, private gtmService: GoogleTagManagerService, private titleService: Title, private router: Router) {
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          page_title: this.titleService.getTitle(),
          page_location: item.url
        };
        this.gtmService.pushTag(gtmTag);
      }
    });
  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
  }
}
