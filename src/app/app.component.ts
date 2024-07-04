
import {Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID} from '@angular/core';
import {slideInAnimation} from "./core/shared/animations";
import {LoadingIndicatorService} from "./core/shared/loading-indicator/loading-indicator.service";
import {BehaviorSubject} from 'rxjs';
import {LoadingIndicatorComponent} from './core/shared/loading-indicator/loading-indicator.component';
import {CoreModule} from './core/core.module';
import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {PrimeNGConfig} from 'primeng/api';
import {InputGroupModule} from 'primeng/inputgroup';
import {Button} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
registerLocaleData(localeNl, 'nl');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ],
  standalone: true,
    imports: [
        CoreModule,
        LoadingIndicatorComponent,
        InputGroupModule,
        Button,
        SidebarModule
    ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'nl-NL',
    },
  ]
})

export class AppComponent implements OnInit {

  public loading: boolean = false;
  commentPanelOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private primengConfig: PrimeNGConfig,
              private loadingIndicatorService: LoadingIndicatorService ){}

  static isBrowser = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.loadingIndicatorService.loading$.subscribe((loading) => {
      this.loading = loading
    });
    this.primengConfig.ripple = true;
  }
}

