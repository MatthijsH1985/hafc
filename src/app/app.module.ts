import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {TeamComponent} from "./pages/team/team.component";
import {PlayersService} from "./services/players.service";
import {TeamService} from "./services/team.service";
import {CommonModule, registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {NieuwsberichtComponent} from "./pages/nieuwsbericht/nieuwsbericht.component";
import {NieuwsarchiefComponent} from "./pages/nieuwsarchief/nieuwsarchief.component";
import {ModalCommentComponent} from "./components/modal-comment/modal-comment.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommentsComponent} from "./components/comments/comments.component";
import {CommentsService} from "./services/comments.service";
import {AccountComponent} from "./pages/account/account.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {RegistrationFormComponent} from "./components/registration-form/registration-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountDetailsComponent} from "./pages/account/account-details/account-details.component";
import {LogoutComponent} from "./pages/account/logout/logout.component";
import {SpelerComponent} from "./pages/team/speler/speler.component";
import {LoginComponent} from "./pages/account/login/login.component";

import { register } from 'swiper/element/bundle'

import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {UserCommentsComponent} from "./pages/account/user-comments/user-comments.component";
import {UserConfigComponent} from "./pages/account/user-config/user-config.component";
import {UserService} from "./services/user.service";
import {RegisterComponent} from "./pages/account/register/register.component";
import {ToastrModule} from "ngx-toastr";
import {AdsService} from "./ads/services/ads.service";
import {MenuService} from "./services/menu.service";
import {SelectieComponent} from "./pages/team/selectie/selectie.component";
import {PlayerOfTheWeekComponent} from "./pages/team/player-of-the-week/player-of-the-week.component";
import {SpecialsComponent} from "./pages/specials/specials.component";
import {TeamstatsComponent} from "./pages/team/teamstats/teamstats.component";
import {PasswordResetComponent} from "./pages/account/password-reset/password-reset.component";
import {SetNewPasswordComponent} from "./pages/account/set-new-password/set-new-password.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {UserConfigEditableComponent} from "./pages/account/user-config-editable/user-config-editable.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {SinglePageComponent} from "./pages/single-page/single-page.component";
import {TransferHttpCacheModule} from "@nguniversal/common";
import {NewsModule} from "./news/news.module";
import {PostsService} from "./news/services/posts.service";
import {AdsModule} from "./ads/ads.module";
import {CoreModule} from "./core/core.module";
import {CompetitionModule} from "./competition/competition.module";

register()
registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    SpelerComponent,
    SelectieComponent,
    PlayerOfTheWeekComponent,
    HomepageComponent,
    NieuwsberichtComponent,
    NieuwsarchiefComponent,
    ModalCommentComponent,
    CommentsComponent,
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
    SpecialsComponent,
    TeamstatsComponent,
    PasswordResetComponent,
    SetNewPasswordComponent,
    NotFoundComponent,
    SinglePageComponent,
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
    CompetitionModule,
    TransferHttpCacheModule,
    NewsModule,
    AdsModule,
    CoreModule
  ],
  exports: [
    HomepageComponent
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'nl',
  },

    CommentsService,
    PlayersService,
    TeamService,
    AdsService,
    PostsService,
    UserService,
    MenuService,
    JwtHelperService, {
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
