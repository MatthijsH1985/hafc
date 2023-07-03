import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamComponent} from "./pages/team/team.component";
import {StandComponent} from "./pages/team/competitie/stand/stand.component";
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
import {SelectieComponent} from "./pages/team/selectie/selectie.component";
import {ResultsComponent} from "./pages/team/competitie/results/results.component";
import {ProgrammaComponent} from "./pages/team/competitie/programma/programma.component";
import {MatchreportComponent} from "./pages/team/competitie/matchreport/matchreport.component";
import {CompetitieComponent} from "./pages/team/competitie/competitie.component";
import {SpecialsComponent} from "./pages/specials/specials.component";
import {TeamstatsComponent} from "./pages/team/teamstats/teamstats.component";
import {PasswordResetComponent} from "./pages/account/password-reset/password-reset.component";
import {SetNewPasswordComponent} from "./pages/account/set-new-password/set-new-password.component";
import {UserConfigEditableComponent} from "./pages/account/user-config-editable/user-config-editable.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

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
    path: 'nieuws/:id/:title'
  },
  {
    component: TeamComponent,
    path: 'club',
    children: [
      {
        component: CompetitieComponent,
        path: 'competitie',
        children: [
          {
            component: ProgrammaComponent,
            path: 'wedstrijdprogramma'
          },
          {
            component: MatchreportComponent,
            path: 'wedstrijdprogramma/:matchId'
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
          }
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
    component: NieuwsarchiefComponent,
    path: 'nieuws'
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
    component: NotFoundComponent,
    path: '*'
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
