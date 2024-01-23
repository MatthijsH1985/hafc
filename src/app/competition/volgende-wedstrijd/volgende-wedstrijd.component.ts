import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as moment from 'moment';
import {PostsService} from "../../news/services/posts.service";
import {FixturesService} from "../services/fixtures.service";

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
    this.postsService.getPosts(1, [37]).subscribe({
      next: (data: any) => {
        this.nextMatchPost = data[0];
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  getFixtures() {
    this.fixturesService.getFixtures(this.teamId).subscribe( {
      next: (data: any) => {
        const { rounds } = data.data[0];
        this.teamFixtures =  rounds;

        const upcomingFixtures = this.teamFixtures.filter((round: any) => {
          const firstFixture = round.fixtures[0];
          const fixtureDate = new Date(firstFixture.starting_at);
          const currentDate = new Date();
          return !firstFixture.finished && fixtureDate > currentDate;
        });

        if (upcomingFixtures.length > 0) {
          upcomingFixtures.sort((a: any, b: any) => {
            const dateA = new Date(a.fixtures[0].starting_at);
            const dateB = new Date(b.fixtures[0].starting_at);
            return dateA.getTime() - dateB.getTime();
          });

          this.nextMatch = upcomingFixtures[0].fixtures[0];

          this.participantHome = this.generateUrlFriendlyString(this.nextMatch.participants[1].name);
          this.participantAway = this.generateUrlFriendlyString(this.nextMatch.participants[0].name);
          this.url = this.participantHome + '-' + this.participantAway;

        }


        this.loading = false;
      },
      error: (error: any) => {
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
