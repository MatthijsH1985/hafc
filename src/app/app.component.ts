import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ChildrenOutletContexts, NavigationEnd, Router} from "@angular/router";
import {slideInAnimation} from "./core/shared/animations";
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

  constructor(private contexts: ChildrenOutletContexts) {

  }
}
