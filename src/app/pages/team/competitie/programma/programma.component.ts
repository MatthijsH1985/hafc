import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FixturesService} from "../../../../services/fixtures.service";
import * as moment from 'moment';
import {ViewportScroller} from "@angular/common";

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

  constructor(private router: Router, private fixturesService: FixturesService, private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
    this.getFixtures();
  }

  getFixtures() {
    this.fixturesService.getFixtures(this.teamId).subscribe( {
      next: data => {
        const { rounds } = data.data[0];

        this.teamFixtures =  rounds;
        this.nextMatch = this.getFirstParticipant(rounds);

        console.log(this.teamFixtures);
        console.log(this.nextMatch);
        this.loading = false;
        this.viewportScroller.scrollToPosition([0, 0]);
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
