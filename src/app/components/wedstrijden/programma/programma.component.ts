import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FixturesService} from "../../../services/fixtures.service";
import * as moment from 'moment';

@Component({
  selector: 'app-programma',
  templateUrl: './programma.component.html',
  styleUrls: ['./programma.component.scss']
})
export class ProgrammaComponent implements OnInit{

  teamId = 1403;
  currentSeason = 19727;
  teamFixtures: any = [];
  teamResults: any = [];
  nextMatch: any = [];
  loading: boolean = true;

  constructor(private router: Router, private fixturesService: FixturesService) {
  }

  ngOnInit() {
    this.getFixtures();
    this.getResults();
  }

  getFixtures() {
    this.fixturesService.getFixtures(this.teamId).subscribe((data) => {
      this.teamFixtures = data.data.upcoming.data.slice(1);
      this.nextMatch = data.data.upcoming.data[0];
      console.log(this.nextMatch);
      this.loading = false;
    }, (error) => {
      console.log('Er is iets mis gegaan: ' + error);
    });
  }

  validDateFormat(dateString: Date): any {
    if(dateString) {
      return moment.utc(dateString);
    }
  }

  getResults() {
    this.fixturesService.getResults(this.teamId, this.currentSeason).subscribe((data) => {
      this.teamResults = data.data.latest.data;
      this.loading = false;
    }, (error) => {
      console.log('Er is iets mis gegaan: ' + error);
    });
  }

  onOpenMatchReport(matchId: number) {
    this.router.navigateByUrl('wedstrijden/' + matchId);
  }
}
