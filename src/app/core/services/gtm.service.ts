import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {GoogleTagManagerService} from "angular-google-tag-manager";

@Injectable()
export class GtmService {
  constructor(private router: Router, private titleService: Title, private gtmService: GoogleTagManagerService) {}

  startTrackingTags() {
    this.router.events.forEach(async (item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          page_title: this.titleService.getTitle(),
          page_location: item.url
        };
        try {
          await this.gtmService.pushTag(gtmTag);
        } catch (error) {
          console.error('Er is een fout opgetreden bij het pushen van de tag:', error);
        }
      }
    });
  }
}
