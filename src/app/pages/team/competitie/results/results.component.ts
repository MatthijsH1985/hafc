import {Component, OnInit} from '@angular/core';
import {FixturesService} from "../../../../services/fixtures.service";
import {Router} from "@angular/router";
import * as moment from "moment/moment";

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

  constructor(private fixturesService: FixturesService, private router: Router) {}

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.fixturesService.getResults(this.teamId, this.currentSeason).subscribe({
      next: results => {
        this.teamResults = results.data.latest.data;
        this.loading = false;
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
    this.router.navigateByUrl('/club/uitslagen/' + matchId);
  }

}
