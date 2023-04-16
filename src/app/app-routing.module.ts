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
    component: LogoutComponent,
    path: 'account/logout'
  },
  {
    component: AccountDetailsComponent,
    path: 'account/details',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
