import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamComponent} from "./pages/team/team.component";
import {StandComponent} from "./components/wedstrijden/stand/stand.component";
import {WedstrijdenComponent} from "./pages/wedstrijden/wedstrijden.component";
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

const routes: Routes = [

  {
    component: HomepageComponent,
    path: '',
    data: {
      animation: 'Homepage'
    }
  },
  {
    component: NieuwsberichtComponent,
    path: 'nieuws/:id/:title',
    data: {
      animation: 'Nieuwsbericht'
    }
  },
  {
    component: TeamComponent,
    path: 'team'
  },
  {
    component: SpelerComponent,
    path: 'team/:id/:naam'
  },
  {
    component: StandComponent,
    path: 'stand'
  },
  {
    component: WedstrijdenComponent,
    path: 'wedstrijden'
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
        path: 'mijn-reacties',
        component: UserCommentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
