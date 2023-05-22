import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FixturesService} from "../../../../services/fixtures.service";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-matchreport',
  templateUrl: './matchreport.component.html',
  styleUrls: ['./matchreport.component.scss']
})
export class MatchreportComponent implements OnInit {
  loading = true;
  matchReportSub: Subscription | undefined;
  matchReportResult: any;
  matchReport = {
    time: {
      status: '',
      starting_at: {
        date_time: null
      }
    },
    scores: {
      localteam_score: null,
      visitorteam_score: null
    },
    lineup: {
      data: null
    },
    localteam_id: '',
    visitorteam_id: '',
    substitutions: {
      data: null
    }
  };
  currentMatchId: any;
  lineup: any;
  substitutions: any;
  localTeamId: any;
  visitorTeamId: any;

  newTime: any;
  countDownDateTime: any;
  now: any;
  distance: any;

  days: any;
  hours: any;
  minutes: any;
  seconds: any;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fixturesService: FixturesService) {}

  ngOnInit() {
    console.log('Hallo');
    this.loading = true;
    this.currentMatchId = this.activatedRoute.snapshot.paramMap.get('matchId');
    this.matchReportSub = this.fixturesService.getMatchReport(this.currentMatchId).subscribe({
      next: data => {
        this.matchReportResult = data;
        this.matchReport = this.matchReportResult.data;
        this.localTeamId = this.matchReport.localteam_id;
        this.visitorTeamId = this.matchReport.visitorteam_id;
        this.lineup = this.createLineup(this.matchReport.lineup.data, 'team_id');
        this.substitutions = this.createLineup(this.matchReport.substitutions.data, 'team_id');
        this.createCountdown(this.matchReport.time.starting_at.date_time);
        this.loading = false;
      },
      error: error => {
        console.error(error)
      }
    });
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      return dateString.replace(/\s/, 'T');
    }
    return null;
  }

  createLineup(xs: any, key: any) {
    return xs.reduce((rv: any, x: any) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  openTeamStats(teamId: number) {
    this.router.navigateByUrl(`wedstrijden/teamstats/${teamId}`);
  }

  createCountdown(time: any) {
    this.newTime = this.validDateFormat(time);
    this.countDownDateTime = new Date(this.newTime).getTime();
    this.now = new Date().getTime();
    this.distance = this.countDownDateTime - this.now;
    this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
    setInterval(() => {
      this.now = new Date().getTime();
      this.distance = this.countDownDateTime - this.now;
      this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
    }, 1000);
  }

  ngOnDestroy() {
    // @ts-ignore
    this.matchReportSub.unsubscribe();
  }
}
