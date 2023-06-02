import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StandingsService} from "../../../../services/standings.service";

interface RankingRow {
  team_name: string;
  // voeg hier andere eigenschappen van de ranking rij toe, indien nodig
}

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
  mainClub: any;
  position: any;
  compactRanking: any = [];
  @Input('compact') compact: boolean = false;

  constructor(private standingsService: StandingsService) {}

  ngOnInit() {
    this.rankingSub = this.standingsService.getStandings(this.currentSeasonId).subscribe((data) => {
      this.loading = false;
      this.ranking = data.data[0].standings.data;

      if(this.compact) {
        const club = 'Heracles Almelo';
        this.ranking = this.selectieRijen(this.ranking, club);
      }
    }, (error) => {
      console.log('Er is iets mis gegaan: ' + error);
    });
  }

  calculateGoalDifference(goalDifference: number) :any {
    return (goalDifference > 0 ? '+' + goalDifference : goalDifference);
  }

  selectieRijen(ranking: RankingRow[], club: string): RankingRow[] {
    const index = ranking.findIndex((row: RankingRow) => row.team_name === club);

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
