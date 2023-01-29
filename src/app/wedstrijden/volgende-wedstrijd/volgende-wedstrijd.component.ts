import {Component, OnInit} from '@angular/core';
import {FixturesService} from "../../services/fixtures.service";
import {Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-volgende-wedstrijd',
  templateUrl: './volgende-wedstrijd.component.html',
  styleUrls: ['./volgende-wedstrijd.component.scss']
})
export class VolgendeWedstrijdComponent implements OnInit{

  nextMatch: any = [];

  constructor(private fixturesService: FixturesService, private router: Router) {

  }

  ngOnInit() {
    this.fixturesService.getFixtures(1403).subscribe((data) => {
      this.nextMatch = data.data.upcoming.data[0];
    }, (error) => {
      console.log(error);
    });
  }

  validDateFormat(dateString: Date): any {
    if(dateString) {
      return moment.utc(dateString);
    }
  }

  onOpenMatch(matchId: number) {
    this.router.navigateByUrl('wedstrijden/' + matchId);
  }
}
