import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ChildrenOutletContexts, NavigationEnd, Router} from "@angular/router";
import {slideInAnimation} from "./shared/animations";
import {Title} from "@angular/platform-browser";
import {GoogleTagManagerService} from "angular-google-tag-manager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  constructor(private contexts: ChildrenOutletContexts, private router: Router, private titleService: Title, private gtmService: GoogleTagManagerService) {
    this.router.events.forEach(async (item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          page_title: this.titleService.getTitle(),
          page_location: item.url
        };

        console.log(gtmTag);

        try {
          await this.gtmService.pushTag(gtmTag);
        } catch (error) {
          console.error('Er is een fout opgetreden bij het pushen van de tag:', error);
        }
      }
    });
  }
}
