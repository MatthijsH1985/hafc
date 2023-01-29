import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NieuwsComponent} from "./nieuws/nieuws.component";
import {TeamComponent} from "./team/team.component";
import {StandComponent} from "./wedstrijden/stand/stand.component";
import {WedstrijdenComponent} from "./wedstrijden/wedstrijden.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";

const routes: Routes = [

  {
    component: HomepageComponent,
    path: ''
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
