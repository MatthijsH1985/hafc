import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
constructor(private router: Router, private gtmService: GoogleTagManagerService, private titleService: Title) {
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
}
