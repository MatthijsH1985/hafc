import {Component, OnInit} from '@angular/core';
import {FixturesService} from "../../../../services/fixtures.service";
import {Router} from "@angular/router";
import * as moment from "moment/moment";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  teamResults: any;
  loading: boolean = true;
  teamId = 1403;
  currentSeason = 19727;

  constructor(private fixturesService: FixturesService, private viewportScroller: ViewportScroller, private router: Router) {}

  ngOnInit() {
  this.viewportScroller.scrollToPosition([0,0]);
    this.getResults();
  }

  getResults() {
    this.fixturesService.getResults(this.teamId, this.currentSeason).subscribe({
      next: results => {
        this.teamResults = results;
        console.log(this.teamResults);
        this.loading = false;
        this.viewportScroller.scrollToPosition([0, 0]);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  validDateFormat(dateString: Date): any {
    if(dateString) {
      return moment.utc(dateString);
    }
  }

  onOpenMatchReport(matchId: number) {
    this.router.navigateByUrl('/club/competitie/uitslagen/' + matchId);
  }

}
