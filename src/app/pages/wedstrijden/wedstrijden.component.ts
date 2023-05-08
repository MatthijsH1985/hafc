import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FixturesService} from '../../services/fixtures.service';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-wedstrijden',
  templateUrl: 'wedstrijden.component.html',
  styleUrls: ['wedstrijden.component.scss']
})
export class WedstrijdenComponent implements OnInit {

  loading = true;
  teamId = 1403;
  currentSeason = 19727;
  teamFixtures: any = [];
  teamResults: any = [];
  nextMatch: any = [];

  constructor(private router: Router, private fixturesService: FixturesService) {}

  ngOnInit() {
    this.getFixtures();
    this.getResults();
  }

  getFixtures() {
    this.fixturesService.getFixtures(this.teamId).subscribe({
      next: data => {
      this.teamFixtures = data.data.upcoming.data;
        console.log(this.teamFixtures)
      this.nextMatch = data.data.upcoming.data[0];
      this.loading = false;
    },
    error: error => {
        console.log(error)
    }
    });
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }

  getResults() {
    this.fixturesService.getResults(this.teamId, this.currentSeason).subscribe( {
      next: results => {
        this.teamResults = results.data.latest.data;
        this.loading = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onOpenMatchReport(matchId: number) {
    this.router.navigateByUrl('wedstrijden/' + matchId);
  }

}
