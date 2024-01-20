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
  public hotjarId = 3829238;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private loadingIndicatorService: LoadingIndicatorService, private translationService: TranslateService ){}

  static isBrowser = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.translationService.use('nl');
    this.loadingIndicatorService.loading$.subscribe((loading) => {
      this.loading = loading
    });
  //   const hotjarVersion = 6;
  //   Hotjar.init(this.hotjarId, hotjarVersion);
  }

}
