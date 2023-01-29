import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SwiperComponent, SwiperModule} from "swiper/angular";
import {NieuwsComponent} from "./nieuws/nieuws.component";
import {NieuwssliderComponent} from "./nieuws/nieuwsslider/nieuwsslider.component";
import {PostsService} from "./services/posts.service";
import {HttpClientModule} from "@angular/common/http";
import {ConfigService} from "./services/config.service";
import {TeamComponent} from "./team/team.component";
import {PlayersService} from "./services/players.service";
import {TeamService} from "./services/team.service";
import {StandComponent} from "./wedstrijden/stand/stand.component";
import {WedstrijdenComponent} from "./wedstrijden/wedstrijden.component";
import {FixturesService} from "./services/fixtures.service";
import {StandingsService} from "./services/standings.service";
import {GenerateLogoUrlPipe} from "./shared/generate-logo-url/generate-logo-url.pipe";
import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {NieuwslijstComponent} from "./nieuws/nieuwslijst/nieuwslijst.component";
import Swiper from "swiper";

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    NieuwsComponent,
    NieuwssliderComponent,
    TeamComponent,
    StandComponent,
    WedstrijdenComponent,
    GenerateLogoUrlPipe,
    HomepageComponent,
    NieuwslijstComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    SwiperModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'nl',
  },
    PostsService, ConfigService, PlayersService, TeamService, FixturesService, StandingsService, Swiper],
  bootstrap: [AppComponent]
})
export class AppModule { }
