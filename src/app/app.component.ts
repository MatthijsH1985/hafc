import {Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID} from '@angular/core';
import {slideInAnimation} from "./core/shared/animations";
import {LoadingIndicatorService} from "./core/shared/loading-indicator/loading-indicator.service";
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject} from 'rxjs';
import {LoadingIndicatorComponent} from './core/shared/loading-indicator/loading-indicator.component';
import {PlayersService} from './services/players.service';
import {TeamService} from './services/team.service';
import {TranslationService} from './services/translation.service';
import {AdsService} from './ads/services/ads.service';
import {UserService} from './services/user.service';
import {MenuService} from './services/menu.service';
import {CoreModule} from './core/core.module';

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
    LoadingIndicatorComponent
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'nl',
  },
    PlayersService,
    TeamService,
    TranslationService,
    AdsService,
    UserService,
    MenuService
  ]
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
  }

}

