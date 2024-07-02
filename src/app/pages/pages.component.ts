import {Component} from '@angular/core';
import {TeamComponent} from './team/team.component';
import {SpelerComponent} from './team/speler/speler.component';
import {SelectieComponent} from './team/selectie/selectie.component';
import {PlayerOfTheWeekComponent} from './team/player-of-the-week/player-of-the-week.component';
import {HomepageComponent} from './homepage/homepage.component';
import {NieuwsberichtComponent} from './nieuwsbericht/nieuwsbericht.component';
import {NieuwsarchiefComponent} from './nieuwsarchief/nieuwsarchief.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {SpecialsComponent} from './specials/specials.component';
import {TeamstatsComponent} from './team/teamstats/teamstats.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SinglePageComponent} from './single-page/single-page.component';
import {DonateComponent} from './donate/donate.component';
import {ThankYouComponent} from './donate/thank-you/thank-you.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  standalone: true,
  imports:[
    TeamComponent,
    SpelerComponent,
    SelectieComponent,
    PlayerOfTheWeekComponent,
    HomepageComponent,
    NieuwsberichtComponent,
    NieuwsarchiefComponent,
    LoginFormComponent,
    SpecialsComponent,
    TeamstatsComponent,
    NotFoundComponent,
    SinglePageComponent,
    DonateComponent,
    ThankYouComponent
  ],
  providers: [

  ]
})

export class PagesComponent {
  constructor() {
  }
}


