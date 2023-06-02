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
    this.getFixtures();
  }

  getFixtures() {
    this.fixturesService.getFixtures(this.teamId).subscribe( {
      next: data => {
        this.teamFixtures = data.data.upcoming.data;
        this.nextMatch = data.data.upcoming.data[0];
        this.loading = false;
        this.viewportScroller.scrollToPosition([0, 0]);
      },
      error: error => {
        console.error(error)
      }
    });
  }

  validDateFormat(dateString: Date): any {
    if(dateString) {
      return moment.utc(dateString);
    }
  }

  onOpenMatchReport(matchId: number) {
    this.router.navigateByUrl('wedstrijden/' + matchId);
  }
}
