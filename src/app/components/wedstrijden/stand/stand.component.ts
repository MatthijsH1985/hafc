import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StandingsService} from "../../../services/standings.service";

@Component({
  selector: 'app-stand',
  templateUrl: './stand.component.html',
  styleUrls: ['./stand.component.scss']
})
export class StandComponent implements OnInit, OnDestroy {
  currentSeasonId = 19727;
  rankingSub: Subscription | undefined;
  ranking: any = [];
  loading = true;

  constructor(private standingsService: StandingsService) {}

  ngOnInit() {
    this.rankingSub = this.standingsService.getStandings(this.currentSeasonId).subscribe((data) => {
      this.loading = false;
      this.ranking = data.data[0].standings.data;
    }, (error) => {
      console.log('Er is iets mis gegaan: ' + error);
    });
  }

  ngOnDestroy() {
    // @ts-ignore
    this.rankingSub.unsubscribe();
  }
}
