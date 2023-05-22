import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamService} from '../../services/team.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  templateUrl: 'teamstats.page.html',
  selector: 'app-teamstats',
  styleUrls: ['teamstats.page.scss']
})

export class TeamstatsPageComponent implements OnInit, OnDestroy {

  currentTeamId;
  teamStatsSub: Subscription;
  team;
  teamStats;
  venue;
  squad;
  loading = true;

  constructor(private teamService: TeamService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.currentTeamId = this.activatedRoute.snapshot.paramMap.get('teamId');
    this.teamStatsSub = this.teamService.getTeamInfo(this.currentTeamId).subscribe((data) => {
      this.team = data.data;
      this.teamStats = data.data.stats.data[0];
      this.venue = data.data.venue.data;
      this.squad = data.data.squad.data[0];
      this.loading = false;
    }, (error) => {
      console.log('Er is iets mis gegaan: ' + error);
    });
  }

  ngOnDestroy() {
    this.teamStatsSub.unsubscribe();
  }
}
