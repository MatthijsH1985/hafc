import {Component, OnInit} from '@angular/core';
import {FixturesService} from "../../../../services/fixtures.service";
import {Router} from "@angular/router";
import * as moment from 'moment';
import {PostsService} from "../../../../services/posts.service";

@Component({
  selector: 'app-volgende-wedstrijd',
  templateUrl: './volgende-wedstrijd.component.html',
  styleUrls: ['./volgende-wedstrijd.component.scss']
})
export class VolgendeWedstrijdComponent implements OnInit{

  nextMatch: any = [];
  nextMatchPost: any;
  teamId = 1403;
  teamFixtures: any;
  loading: boolean = true;
  participantHome: string = '';
  participantAway: string = '';
  url: string = '';

  constructor(private fixturesService: FixturesService, private postsService: PostsService, private router: Router) {

  }

  ngOnInit() {
    this.getFixtures();
    this.getPreviewMatch()
  }

  getPreviewMatch() {
    this.postsService.getMatchReports().subscribe({
      next: (data:any) => {
        this.nextMatchPost = data[0];
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getFixtures() {
    this.fixturesService.getFixtures(this.teamId).subscribe( {
      next: data => {
        const { rounds } = data.data[0];
        this.teamFixtures =  rounds;
        if (this.teamFixtures.length > 0) {
          this.teamFixtures.sort((a: any, b: any) => {
            const dateA = new Date(a.fixtures[0].starting_at);
            const dateB = new Date(b.fixtures[0].starting_at);
            return dateA.getTime() - dateB.getTime();
          });
        }

        this.participantHome = this.generateUrlFriendlyString(this.teamFixtures[0].fixtures[0].participants[0].name);
        this.participantAway = this.generateUrlFriendlyString(this.teamFixtures[0].fixtures[0].participants[1].name);
        this.url = this.participantHome + '-' + this.participantAway;

        this.nextMatch = this.teamFixtures[0];
        this.loading = false;
      },
      error: error => {
        console.error(error)
        this.loading = false;
      }
    });
  }

  generateUrlFriendlyString(str: string): string {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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
