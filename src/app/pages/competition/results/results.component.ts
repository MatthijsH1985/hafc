import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import * as moment from "moment/moment";
import {CommonModule, ViewportScroller} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {FixturesService} from "../services/fixtures.service";
import {MetaService} from "../../../core/services/meta.service";
import {CoreModule} from '../../../core/core.module';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  standalone: true,
  imports: [
    CoreModule,
    CommonModule
  ]
})
export class ResultsComponent implements OnInit {
  loading: boolean = true;
  teamId = 1403;
  teamResults: any = [];
  homeTeamTotalScore: any;
  awayTeamTotalScore: any;

  constructor(private fixturesService: FixturesService, private metaService: MetaService, private title: Title, private titleService: Title, private viewportScroller: ViewportScroller, private router: Router) {}

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
    this.getResults();
    this.metaService.updateMetaTag('Uitslagen - HAFC.nl', this.router.url, 'Alle uitslagen van Heracles in de Eredivisie');
  }

  getResults() {
    this.fixturesService.getFixtures(this.teamId).subscribe({
      next: (data: any) => {
        const { rounds } = data.data[0];
        this.teamResults = rounds;
        this.loading = false;
        this.viewportScroller.scrollToPosition([0, 0]);
        this.teamResults = this.teamResults.filter((round: any) => round.fixtures[0].result_info);
        this.teamResults.sort((a: any, b: any) => {
          const dateA = new Date(a.fixtures[0].starting_at);
          const dateB = new Date(b.fixtures[0].starting_at);
          return dateA.getTime() - dateB.getTime();
        });

        this.viewportScroller.scrollToPosition([0, 0]);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  calculateScore(scoreData: any, side: any) {
    const goals = scoreData.filter((score: any) => {
      return score.score.participant === side && score.description === 'CURRENT';
    });
    const totalGoals = goals.reduce((total: number, score: any) => total + score.score.goals, 0);
    return totalGoals;
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
