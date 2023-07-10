import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StandingsService} from "../../../../services/standings.service";
import {ViewportScroller} from "@angular/common";
import {NavigationEnd, Router} from "@angular/router";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {Title} from "@angular/platform-browser";

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
  teamId: number = 0;
  @Input('compact') compact: boolean = false;

  constructor(private standingsService: StandingsService, private router: Router, private titleService: Title, private viewportScroller: ViewportScroller) {

  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
    this.rankingSub = this.standingsService.getStandings(this.currentSeasonId).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.ranking = data.data;
        if(this.compact) {
          const club = 'Heracles Almelo';
          this.ranking = this.selectieRijen(this.ranking, club);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getDetailValue(club: any, code: string): number {
    const detail = club?.details?.find((d: any) => d?.type?.code === code);
    return detail?.value || 0;
  }

  calculateGoalDifference(goalsFor: number, goalsAgainst: number) :any {
    return goalsFor - goalsAgainst
    // return (goalDifference > 0 ? '+' + goalDifference : goalDifference);
  }

  selectieRijen(ranking: any[], club: string): any[] {
    const index = ranking.findIndex((row: any) => row.participant.name === club);

    if (index === -1) {
      throw new Error(`Team ${club} niet gevonden in ranglijst.`);
    }

    let start, end;
    if (index < 2) {
      start = 0;
      end = Math.min(4, ranking.length - 1);
    } else if (index >= ranking.length - 3) {
      start = Math.max(ranking.length - 5, 0);
      end = ranking.length - 1;
    } else {
      start = index - 2;
      end = index + 2;
    }

    return ranking.slice(start, end + 1);
  }

  ngOnDestroy() {
    // @ts-ignore
    this.rankingSub.unsubscribe();
  }
}
