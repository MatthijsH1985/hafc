import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router"
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoadingIndicatorComponent} from "./shared/loading-indicator/loading-indicator.component";
import {GenerateLogoUrlPipe} from "./shared/generate-logo-url/generate-logo-url.pipe";
import {RoundNumberPipe} from "./shared/round-number/round-number.pipe";
import {TransformTeamDataPipe} from "./shared/transform-team-data/transform-team-data.pipe";
import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaV3Module
} from 'ng-recaptcha';
import {environment} from "../../environments/environment";
import {ConfigService} from "./services/config.service";
import {SessionStorage} from "./services/session-storage";
import {MemoryStorage} from "./services/memory-storage";
import {LocalStorage} from "./services/local-storage";
import {MetaService} from "./services/meta.service";
import {AdsModule} from "../ads/ads.module";
import {PositiveNumberPipe} from "./shared/positive-number/positive-number.pipe";
import {PreloaderComponent} from "./shared/preloader/preloader.component";
import {CartService} from '../shop/cart/services/cart.service';
import {SafePipe} from './shared/safe.pipe';
import { CreditsComponent } from './footer/credits/credits.component';
import {AdsComponent} from '../ads/ads/ads.component';
import {CountdownComponent} from '../components/countdown/countdown.component';
import {CountdownService} from '../components/countdown/countdown.service';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        NavigationComponent,
        GenerateLogoUrlPipe,
        RoundNumberPipe,
        SafePipe,
        PositiveNumberPipe,
        TransformTeamDataPipe,
        LoadingIndicatorComponent,
        PreloaderComponent,
        CreditsComponent,
        CountdownComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module
  ],
    exports: [
        HeaderComponent,
        FooterComponent,
        NavigationComponent,
        SafePipe,
        GenerateLogoUrlPipe,
        RoundNumberPipe,
        PositiveNumberPipe,
        TransformTeamDataPipe,
        FontAwesomeModule,
        PreloaderComponent,
        LoadingIndicatorComponent,
        RouterModule,
        CreditsComponent,
        CountdownComponent
    ],
  providers: [
    ConfigService,
    SessionStorage,
    LocalStorage,
    MetaService,
    CartService,
    CountdownService,
    MemoryStorage,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey
    },
  ]
})
export class CoreModule { }
