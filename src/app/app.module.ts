import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostsService} from "./services/posts.service";
import {HttpClientModule} from "@angular/common/http";
import {ConfigService} from "./services/config.service";
import {TeamComponent} from "./pages/team/team.component";
import {PlayersService} from "./services/players.service";
import {TeamService} from "./services/team.service";
import {StandComponent} from "./pages/team/competitie/stand/stand.component";
import {FixturesService} from "./services/fixtures.service";
import {StandingsService} from "./services/standings.service";
import {GenerateLogoUrlPipe} from "./shared/generate-logo-url/generate-logo-url.pipe";
import {CommonModule, registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {NieuwslijstComponent} from "./components/nieuws/nieuwslijst/nieuwslijst.component";
import {NieuwsberichtComponent} from "./pages/nieuwsbericht/nieuwsbericht.component";
import {HeaderComponent} from "./components/header/header.component";
import {NieuwsarchiefComponent} from "./pages/nieuwsarchief/nieuwsarchief.component";
import {VolgendeWedstrijdComponent} from "./pages/team/competitie/volgende-wedstrijd/volgende-wedstrijd.component";
import {ModalCommentComponent} from "./components/modal-comment/modal-comment.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoadingIndicatorComponent} from "./shared/loading-indicator/loading-indicator.component";
import {CommentsComponent} from "./components/comments/comments.component";
import {CommentsService} from "./services/comments.service";
import {FooterComponent} from "./components/footer/footer.component";
import {AccountComponent} from "./pages/account/account.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {RegistrationFormComponent} from "./components/registration-form/registration-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountDetailsComponent} from "./pages/account/account-details/account-details.component";
import {LogoutComponent} from "./pages/account/logout/logout.component";
import {SpelerComponent} from "./pages/team/speler/speler.component";
import {RoundNumberPipe} from "./shared/round-number/round-number.pipe";
import {LoginComponent} from "./pages/account/login/login.component";
import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaV3Module
} from 'ng-recaptcha';
import {environment} from "../environments/environment";

import { register } from 'swiper/element/bundle'

import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {UserCommentsComponent} from "./pages/account/user-comments/user-comments.component";
import {UserConfigComponent} from "./pages/account/user-config/user-config.component";
import {UserService} from "./services/user.service";
import {RegisterComponent} from "./pages/account/register/register.component";
import {ToastrModule} from "ngx-toastr";
import {AdsService} from "./services/ads.service";
import {LocalStorage} from "./services/local-storage";
import {SessionStorage} from "./services/session-storage";
import {MemoryStorage} from "./services/memory-storage";
import {MenuService} from "./services/menu.service";
import {ResultsComponent} from "./pages/team/competitie/results/results.component";
import {SelectieComponent} from "./pages/team/selectie/selectie.component";
import {ProgrammaComponent} from "./pages/team/competitie/programma/programma.component";
import {TransformTeamDataPipe} from "./shared/transform-team-data/transform-team-data.pipe";
import {MatchreportComponent} from "./pages/team/competitie/matchreport/matchreport.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {PlayerOfTheWeekComponent} from "./pages/team/player-of-the-week/player-of-the-week.component";
import {CompetitieComponent} from "./pages/team/competitie/competitie.component";
import {SpecialsComponent} from "./pages/specials/specials.component";
import {TeamstatsComponent} from "./pages/team/teamstats/teamstats.component";
import {PasswordResetComponent} from "./pages/account/password-reset/password-reset.component";
import {SetNewPasswordComponent} from "./pages/account/set-new-password/set-new-password.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {UserConfigEditableComponent} from "./pages/account/user-config-editable/user-config-editable.component";
import {AddsComponent} from "./components/adds/adds.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {NieuwssliderModule} from "./components/nieuws/nieuwsslider/nieuwsslider.module";
import {NieuwssliderComponent} from "./components/nieuws/nieuwsslider/nieuwsslider.component";
import {SinglePageComponent} from "./pages/single-page/single-page.component";
register()
registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    SpelerComponent,
    StandComponent,
    ProgrammaComponent,
    SelectieComponent,
    CompetitieComponent,
    PlayerOfTheWeekComponent,
    MatchreportComponent,
    ResultsComponent,
    GenerateLogoUrlPipe,
    RoundNumberPipe,
    TransformTeamDataPipe,
    HomepageComponent,
    NieuwslijstComponent,
    NieuwsberichtComponent,
    HeaderComponent,
    HeaderComponent,
    NieuwsarchiefComponent,
    VolgendeWedstrijdComponent,
    ModalCommentComponent,
    LoadingIndicatorComponent,
    CommentsComponent,
    FooterComponent,
    AccountComponent,
    RegistrationFormComponent,
    AccountDetailsComponent,
    LoginFormComponent,
    LogoutComponent,
    LoginComponent,
    UserCommentsComponent,
    UserConfigComponent,
    UserConfigEditableComponent,
    RegisterComponent,
    NavigationComponent,
    SpecialsComponent,
    TeamstatsComponent,
    PasswordResetComponent,
    SetNewPasswordComponent,
    AddsComponent,
    NotFoundComponent,
    SinglePageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
    NieuwssliderModule,
    NieuwssliderComponent
  ],
  exports: [
    HomepageComponent
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'nl',
  },
    {
      provide: 'googleTagManagerId',
      useValue: 'GTM-NC42PW4'
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey
    },

    PostsService,
    ConfigService,
    CommentsService,
    PlayersService,
    TeamService,
    FixturesService,
    StandingsService,
    AdsService,
    LocalStorage,
    SessionStorage,
    MemoryStorage,
    UserService,
    MenuService,
    JwtHelperService, {
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
