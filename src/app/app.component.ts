import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ChildrenOutletContexts} from "@angular/router";
import {slideInAnimation} from "./shared/animations";

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
