import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostsService} from "./services/posts.service";
import {HttpClientModule} from "@angular/common/http";
import {ConfigService} from "./services/config.service";
import {TeamComponent} from "./pages/team/team.component";
import {PlayersService} from "./services/players.service";
import {TeamService} from "./services/team.service";
import {StandComponent} from "./components/wedstrijden/stand/stand.component";
import {WedstrijdenComponent} from "./pages/wedstrijden/wedstrijden.component";
import {FixturesService} from "./services/fixtures.service";
import {StandingsService} from "./services/standings.service";
import {GenerateLogoUrlPipe} from "./shared/generate-logo-url/generate-logo-url.pipe";
import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {NieuwslijstComponent} from "./components/nieuws/nieuwslijst/nieuwslijst.component";
import {NieuwsberichtComponent} from "./pages/nieuwsbericht/nieuwsbericht.component";
import {HeaderComponent} from "./components/header/header.component";
import {NieuwsarchiefComponent} from "./pages/nieuwsarchief/nieuwsarchief.component";
import {VolgendeWedstrijdComponent} from "./components/wedstrijden/volgende-wedstrijd/volgende-wedstrijd.component";
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
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LogoutComponent} from "./pages/account/logout/logout.component";
import {SpelerComponent} from "./pages/team/speler/speler.component";
import {RoundNumberPipe} from "./shared/round-number/round-number.pipe";
import {LoginComponent} from "./pages/account/login/login.component";
import { register } from 'swiper/element/bundle'
import {NieuwssliderModule} from "./components/nieuws/nieuwsslider/nieuwsslider.module";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {UserCommentsComponent} from "./pages/account/user-comments/user-comments.component";
import {UserConfigComponent} from "./pages/account/user-config/user-config.component";
import {UserService} from "./services/user.service";
import {RegisterComponent} from "./pages/account/register/register.component";
import {ToastrModule} from "ngx-toastr";
import {AdsService} from "./services/ads.service";
register()
registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    SpelerComponent,
    StandComponent,
    WedstrijdenComponent,
    GenerateLogoUrlPipe,
    RoundNumberPipe,
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
    RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    NieuwssliderModule
  ],
  exports: [
    HomepageComponent
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'nl',
  },
    PostsService,
    ConfigService,
    CommentsService,
    PlayersService,
    TeamService,
    FixturesService,
    StandingsService,
    AdsService,
    UserService,
    JwtHelperService, {
    provide: JWT_OPTIONS, useValue: JWT_OPTIONS
  },
    {
      provide: 'isBrowser',
      useValue: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
