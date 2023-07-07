import {Component, OnInit} from '@angular/core';
import {FixturesService} from "../../../../services/fixtures.service";
import {Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-volgende-wedstrijd',
  templateUrl: './volgende-wedstrijd.component.html',
  styleUrls: ['./volgende-wedstrijd.component.scss']
})
export class VolgendeWedstrijdComponent implements OnInit{

  nextMatch: any = [];
  teamId = 1403;
  teamFixtures: any;

  constructor(private fixturesService: FixturesService, private router: Router) {

  }

  ngOnInit() {
    this.getFixtures();
  }

  getFixtures() {
    this.fixturesService.getFixtures(this.teamId).subscribe( {
      next: data => {
        const { rounds } = data.data[0];
        this.teamFixtures =  rounds;
        this.teamFixtures.sort((a: any, b: any) => {
          const dateA = new Date(a.starting_at);
          const dateB = new Date(b.starting_at);
          return dateA.getTime() - dateB.getTime();
        });
        this.nextMatch = this.teamFixtures[0];
        console.log(this.nextMatch)
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

  onOpenMatch(matchId: number) {
    this.router.navigateByUrl('wedstrijden/' + matchId);
  }
}
