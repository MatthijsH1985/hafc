import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamComponent} from "./pages/team/team.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {NieuwsberichtComponent} from "./pages/nieuwsbericht/nieuwsbericht.component";
import {NieuwsarchiefComponent} from "./pages/nieuwsarchief/nieuwsarchief.component";
import {AccountComponent} from "./pages/account/account.component";
import {AccountDetailsComponent} from "./pages/account/account-details/account-details.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {LoginComponent} from "./pages/account/login/login.component";
import {LogoutComponent} from "./pages/account/logout/logout.component";
import {SpelerComponent} from "./pages/team/speler/speler.component";
import {UserConfigComponent} from "./pages/account/user-config/user-config.component";
import {UserCommentsComponent} from "./pages/account/user-comments/user-comments.component";
import {RegisterComponent} from "./pages/account/register/register.component";
import {SpecialsComponent} from "./pages/specials/specials.component";
import {TeamstatsComponent} from "./pages/team/teamstats/teamstats.component";
import {PasswordResetComponent} from "./pages/account/password-reset/password-reset.component";
import {SetNewPasswordComponent} from "./pages/account/set-new-password/set-new-password.component";
import {UserConfigEditableComponent} from "./pages/account/user-config-editable/user-config-editable.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {SinglePageComponent} from "./pages/single-page/single-page.component";
import {MatchResolver} from "./services/resolvers/match-resolver.service";
import {PostResolver} from "./news/services/resolvers/post-resolver.service";
import {MatchpreviewComponent} from "./competition/matchpreview/matchpreview.component";
import {MatchreportComponent} from "./competition/matchreport/matchreport.component";
import {SelectieComponent} from "./pages/team/selectie/selectie.component";
import {ResultsComponent} from "./competition/results/results.component";
import {StandComponent} from "./competition/stand/stand.component";
import {ProgrammaComponent} from "./competition/programma/programma.component";
import {Competitioncomponent} from "./competition/competition/competitioncomponent";
import {PostsResolver} from "./news/resolvers/posts-resolver.service";
const routes: Routes = [

  {
    component: HomepageComponent,
    path: ''
  },
  {
    component: SpecialsComponent,
    path: 'specials'
  },
  {
    component: NieuwsberichtComponent,
    path: 'nieuws/:id/:title',
    resolve: {
      post: PostResolver
    }
  },
  {
    component: TeamComponent,
    path: 'club',
    children: [
      {
        component: Competitioncomponent,
        path: 'competitie',
        children: [
          {
            component: ProgrammaComponent,
            path: 'wedstrijdprogramma'
          },
          {
            component: MatchreportComponent,
            path: 'wedstrijdprogramma/:matchId/report'
          },
          {
            component: StandComponent,
            path: 'stand'
          },
          {
            component: ResultsComponent,
            path: 'uitslagen'
          },
          {
            component: MatchreportComponent,
            path: 'uitslagen/:matchId'
          },
        ]
      },
      {
        component: TeamstatsComponent,
        path: 'teamstats/:teamId'
      },
      {
        component: SelectieComponent,
        path: 'selectie'
      },
      {
        component: SpelerComponent,
        path: 'selectie/:id/:naam'
      }
    ]
  },
  {
    component: MatchpreviewComponent,
    path: 'voorbeschouwing/:opponents/:id',
    resolve: {
      post: MatchResolver
    }
  },
  {
    component: NieuwsarchiefComponent,
    path: 'nieuws',
    resolve: {
      posts: PostsResolver
    }
  },
  {
    component: AccountComponent,
    path: 'account'
  },
  {
    component: LoginComponent,
    path: 'account/login'
  },
  {
    component: RegisterComponent,
    path: 'account/register'
  },
  {
    component: PasswordResetComponent,
    path: 'account/password-reset'
  },
  {
    component: SetNewPasswordComponent,
    path: 'account/set-new-password'
  },
  {
    component: LogoutComponent,
    path: 'account/logout'
  },
  {
    component: AccountDetailsComponent,
    path: 'account/details',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mijn-gegevens',
        component: UserConfigComponent
      },
      {
        path: 'mijn-gegevens/edit',
        component: UserConfigEditableComponent
      },
      {
        path: 'mijn-reacties',
        component: UserCommentsComponent
      }
    ]
  },
  {
    path: 'page/:id/:title',
    component: SinglePageComponent
  },
  {
    component: NotFoundComponent,
    path: '**'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
