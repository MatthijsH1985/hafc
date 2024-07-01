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
import {ConfigService} from "./services/config.service";
import {SessionStorage} from "./services/session-storage";
import {MemoryStorage} from "./services/memory-storage";
import {LocalStorage} from "./services/local-storage";
import {MetaService} from "./services/meta.service";
import {PositiveNumberPipe} from "./shared/positive-number/positive-number.pipe";
import {PreloaderComponent} from "./shared/preloader/preloader.component";
import {SafePipe} from './shared/safe.pipe';
import { CreditsComponent } from './footer/credits/credits.component';
import {CountdownComponent} from '../components/countdown/countdown.component';
import {CountdownService} from '../components/countdown/countdown.service';
import {CommentsStringPipe} from './shared/comments-string.pipe';
import {PositiveNegativePipe} from './shared/positive-negative.pipe';

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
        CountdownComponent,
        CommentsStringPipe,
        PositiveNegativePipe
    ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
    exports: [
        HeaderComponent,
        FooterComponent,
        NavigationComponent,
        SafePipe,
        GenerateLogoUrlPipe,
        RoundNumberPipe,
        PositiveNumberPipe,
        PositiveNegativePipe,
        TransformTeamDataPipe,
        CommentsStringPipe,
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
    CountdownService,
    MemoryStorage
  ]
})
export class CoreModule { }
