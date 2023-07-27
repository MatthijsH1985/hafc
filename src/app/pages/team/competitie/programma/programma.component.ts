import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FixturesService} from "../../../../services/fixtures.service";
import * as moment from 'moment';
import {ViewportScroller} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {MetaService} from "../../../../core/services/meta.service";

@Component({
  selector: 'app-programma',
  templateUrl: './programma.component.html',
  styleUrls: ['./programma.component.scss']
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
      next: data => {
        const { rounds } = data.data[0];
        this.teamFixtures =  rounds;
        this.loading = false;
        this.viewportScroller.scrollToPosition([0, 0]);

        this.teamFixtures = this.teamFixtures.filter((fixture: any) => !fixture.finished);

        if (this.teamFixtures.length > 0) {
          // Sorteer de fixtures op basis van het "starting_at" veld binnen het geneste "fixtures" object
          this.teamFixtures.sort((a: any, b: any) => {
            const dateA = new Date(a.fixtures[0].starting_at);
            const dateB = new Date(b.fixtures[0].starting_at);
            return dateA.getTime() - dateB.getTime();
          });
        }
      },
      error: error => {
        console.error(error)
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
