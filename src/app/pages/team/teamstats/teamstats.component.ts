import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";
import {TeamService} from "../../../services/team.service";
import {CoreModule} from '../../../core/core.module';

@Component({
  templateUrl: 'teamstats.page.html',
  selector: 'app-teamstats',
  styleUrls: ['teamstats.page.scss'],
  imports: [
    CoreModule
  ],
  standalone: true
})

export class TeamstatsComponent implements OnInit, OnDestroy {

  currentTeamId: any;
  teamStatsSub: Subscription;
  team: any;
  teamStats: any;
  venue: any;
  squad: any;
  loading = true;

  constructor(private teamService: TeamService, private activatedRoute: ActivatedRoute) {
    this.teamStatsSub = new Subscription();
  }

  ngOnInit() {
    this.currentTeamId = this.activatedRoute.snapshot.paramMap.get('teamId');
    this.teamStatsSub = this.teamService.getTeamInfo(this.currentTeamId).subscribe({
      next: data => {
        this.team = data.data;
        this.teamStats = data.data.stats.data[0];
        this.venue = data.data.venue.data;
        this.squad = data.data.squad.data[0];
        this.loading = false;
      },
      error: error => {
        console.error(error)
      }
    });
  }

  ngOnDestroy() {
    this.teamStatsSub.unsubscribe()
  }
}
