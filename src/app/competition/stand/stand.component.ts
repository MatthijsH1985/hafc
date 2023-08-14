import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ViewportScroller} from "@angular/common";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {StandingsService} from "../services/standings.service";
import {MetaService} from "../../core/services/meta.service";

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
  detailCodeMapping: any = {
    matchesPlayed: 129,
    matchesWon: 130,
    matchesDrawn: 131,
    matchesLost: 132,
    goalsScored: 133,
    goalsConceded: 134,
    // Voeg hier andere mappings toe zoals nodig
  };
  @Input('compact') compact: boolean = false;

  constructor(private standingsService: StandingsService, private metaService: MetaService, private title: Title, private router: Router, private titleService: Title, private viewportScroller: ViewportScroller) {

  }

  ngOnInit() {
    if (!this.compact) {
      this.title.setTitle('Stand - HAFC.nl');
      this.metaService.updateMetaTag('Stand - HAFC.nl', this.router.url, 'De stand van de Eredivisie');
    }
    this.viewportScroller.scrollToPosition([0, 0]);
    this.rankingSub = this.standingsService.getStandings(this.currentSeasonId).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.ranking = data.data;
        if (this.compact) {
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

    const detailCode = this.detailCodeMapping[code]; // Haal de code op uit de mapping

    if (detailCode && club.details) {
      const detail = club.details.find((detail: any) => detail.type_id === detailCode);

      if (detail) {
        return detail.value;
      }
    }

    return 0;
  }

  calculateGoalDifference(club: any, goalsScored: string, goalsConceded: string): any {
    const detailCodeGoalsScored = this.detailCodeMapping[goalsScored];
    const detailCodeGoalsConceded = this.detailCodeMapping[goalsConceded];

    if ((detailCodeGoalsScored || detailCodeGoalsConceded) && club.details) {
      const detailGoalsScored = club.details.find((detail: any) => detail.type_id === detailCodeGoalsScored);
      const detailGoalsConceded = club.details.find((detail: any) => detail.type_id === detailCodeGoalsConceded);
      if (detailGoalsScored && detailGoalsConceded ) {
        const goalDifference = detailGoalsScored.value - detailGoalsConceded.value;
        return goalDifference;
      }
    }
    return 0;
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
