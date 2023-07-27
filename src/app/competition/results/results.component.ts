import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import * as moment from "moment/moment";
import {ViewportScroller} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {FixturesService} from "../services/fixtures.service";
import {MetaService} from "../../core/services/meta.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  loading: boolean = true;
  teamId = 1403;
  teamFixtures: any = [];

  constructor(private fixturesService: FixturesService, private metaService: MetaService, private title: Title, private titleService: Title, private viewportScroller: ViewportScroller, private router: Router) {

  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
    this.getResults();
    this.metaService.updateMetaTag('Uitslagen - HAFC.nl', this.router.url, 'Alle uitslagen van Heracles in de Eredivisie');
  }

  getResults() {
    this.fixturesService.getFixtures(this.teamId).subscribe({
      next: (data: any) => {
        const { rounds } = data.data[0];
        this.teamFixtures =  rounds;
        this.loading = false;
        this.viewportScroller.scrollToPosition([0, 0]);

        this.teamFixtures = this.teamFixtures.filter((fixture: any) => fixture.finished);

        if (this.teamFixtures.length > 0) {
          this.teamFixtures.sort((a: any, b: any) => {
            const dateA = new Date(a.fixtures[0].starting_at);
            const dateB = new Date(b.fixtures[0].starting_at);
            return dateA.getTime() - dateB.getTime();
          });
          console.log(this.teamFixtures);
        }
        this.viewportScroller.scrollToPosition([0, 0]);
      },
      error: (error: any) => {
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
    this.router.navigateByUrl('/club/competitie/uitslagen/' + matchId);
  }

}