import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamComponent} from "./team/team.component";
import {StandComponent} from "./wedstrijden/stand/stand.component";
import {WedstrijdenComponent} from "./wedstrijden/wedstrijden.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {NieuwsberichtComponent} from "./pages/nieuwsbericht/nieuwsbericht.component";
import {NieuwsarchiefComponent} from "./pages/nieuwsarchief/nieuwsarchief.component";

const routes: Routes = [

  {
    component: HomepageComponent,
    path: ''
  },
  {
    component: NieuwsberichtComponent,
    path: 'nieuws/:id/:title'
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
