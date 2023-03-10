import {Component, OnInit} from '@angular/core';
import {PlayersService} from "../../../services/players.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-speler',
  templateUrl: './speler.component.html',
  styleUrls: ['./speler.component.scss']
})
export class SpelerComponent implements OnInit {
  playerId: any = this.activatedRoute.snapshot.paramMap.get('id');
  loading: boolean = true;
  player: any;
  playerSub: Subscription | undefined;
  playerStatsSub: Subscription | undefined;
  playerStats: any = [];
  playerInfo: any = [];
  constructor(private playersService: PlayersService, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.playerSub = this.playersService.getPlayer(this.playerId).subscribe({
      next: playerInfo => {
        this.player = playerInfo;
        this.loading = false;
        this.getPlayerStats(this.player);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getPlayerStats(player: any) {
    this.playerStatsSub = this.playersService.getPlayerStats(player.acf.sportmonks_player_id).subscribe((data) => {
      this.playerStats = data.data.stats.data[0];
      this.playerInfo = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
    });
  }

}
