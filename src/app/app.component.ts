import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {slideInAnimation} from "./core/shared/animations";
import {LoadingIndicatorService} from "./core/shared/loading-indicator/loading-indicator.service";
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ],
})
export class AppComponent implements OnInit {

  public loading: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private loadingIndicatorService: LoadingIndicatorService ){}

  static isBrowser = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.loadingIndicatorService.loading$.subscribe((loading) => {
      this.loading = loading
    });
  }

}
