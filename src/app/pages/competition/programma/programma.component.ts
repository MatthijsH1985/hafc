import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as moment from 'moment';
import {CommonModule, ViewportScroller} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {FixturesService} from "../services/fixtures.service";
import {MetaService} from "../../../core/services/meta.service";
import {CoreModule} from '../../../core/core.module';

@Component({
  selector: 'app-programma',
  templateUrl: './programma.component.html',
  styleUrls: ['./programma.component.scss'],
  standalone: true,
  imports: [
    CoreModule,
    CommonModule
  ]
})
export class ProgrammaComponent implements OnInit{

  teamId = 1403;
  teamFixtures: any = [];
  nextMatch: any = [];
  loading: boolean = true;

  constructor(private router: Router, private fixturesService: FixturesService, private title: Title, private metaService: MetaService, private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
    this.getFixtures();
    this.title.setTitle('Programma - HAFC.nl')
    this.metaService.updateMetaTag('Wedstrijdprogramma - HAFC.nl', this.router.url, 'Het wedstrijdprogramma van Heracles in de Eredivisie');
  }

  getFixtures() {
    this.fixturesService.getFixtures(this.teamId).subscribe( {
      next: (data: any) => {

        const { rounds } = data.data[0];
        this.teamFixtures =  rounds;

        const upcomingFixtures = this.teamFixtures.filter((round: any) => {
          const firstFixture = round.fixtures[0];
          const fixtureDate = new Date(firstFixture.starting_at);
          const currentDate = new Date();
          return !firstFixture.finished && fixtureDate > currentDate;
        });

        if (upcomingFixtures.length > 0) {
          upcomingFixtures.forEach((fixture: any) => {
            fixture.fixtures[0].participants.sort((x: any, y: any) => {
              const locationX = x.meta.location;
              const locationY = y.meta.location;

              if (locationX === 'home' && locationY === 'away') {
                return -1;
              } else if (locationX === 'away' && locationY === 'home') {
                return 1;
              }

              return 0;
            });
          });
          upcomingFixtures.sort((a: any, b: any) => {
            const dateA = new Date(a.fixtures[0].starting_at);
            const dateB = new Date(b.fixtures[0].starting_at);
            return dateA.getTime() - dateB.getTime();
          });
          this.teamFixtures = upcomingFixtures;
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  getFirstParticipant(rounds: any[]): any {
    const firstRound = rounds[0];
    const firstFixture = firstRound?.fixtures[0];
    const firstParticipant = firstFixture?.participants[0];

    return firstParticipant;
  }

  validDateFormat(dateString: Date): any {
    if(dateString) {
      return moment.utc(dateString);
    }
  }
}
