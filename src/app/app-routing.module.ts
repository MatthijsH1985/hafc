import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamComponent} from "./pages/team/team.component";
import {StandComponent} from "./components/wedstrijden/stand/stand.component";
import {WedstrijdenComponent} from "./pages/wedstrijden/wedstrijden.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {NieuwsberichtComponent} from "./pages/nieuwsbericht/nieuwsbericht.component";
import {NieuwsarchiefComponent} from "./pages/nieuwsarchief/nieuwsarchief.component";
import {AccountComponent} from "./pages/account/account.component";

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
    component: StandComponent,
    path: 'stand'
  },
  {
    component: WedstrijdenComponent,
    path: 'wedstrijden'
  },
  {
    component: NieuwsarchiefComponent,
    path: 'nieuwsarchief'
  },
  {
    component: AccountComponent,
    path: 'account'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
