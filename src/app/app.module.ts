import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SwiperComponent, SwiperModule} from "swiper/angular";
import {NieuwssliderComponent} from "./components/nieuws/nieuwsslider/nieuwsslider.component";
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
import Swiper from "swiper";
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
import {ReactiveFormsModule} from "@angular/forms";
import {AccountDetailsComponent} from "./pages/account/account-details/account-details.component";

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    StandComponent,
    WedstrijdenComponent,
    GenerateLogoUrlPipe,
    HomepageComponent,
    NieuwslijstComponent,
    NieuwsberichtComponent,
    NieuwssliderComponent,
    HeaderComponent,
    HeaderComponent,
    NieuwsarchiefComponent,
    VolgendeWedstrijdComponent,
    ModalCommentComponent,
    LoadingIndicatorComponent,
    CommentsComponent,
    FooterComponent,
    AccountComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    SwiperModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'nl',
  },
    PostsService, ConfigService, CommentsService, PlayersService, TeamService, FixturesService, StandingsService, Swiper],
  bootstrap: [AppComponent]
})
export class AppModule { }
