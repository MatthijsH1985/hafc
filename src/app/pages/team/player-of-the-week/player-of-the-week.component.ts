import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayersService} from "../../../services/players.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-player-of-the-week',
  templateUrl: './player-of-the-week.component.html',
  styleUrls: ['./player-of-the-week.component.scss']
})
export class PlayerOfTheWeekComponent implements OnInit, OnDestroy{
  playerOfTheWeek: any;
  playerOfTheWeekSub: Subscription = new Subscription();
  constructor(private playersService: PlayersService) {
  }
  ngOnInit() {
    this.playerOfTheWeekSub = this.playersService.getPlayerOfTheWeek().subscribe({
      next: (player: any) => {
        this.playerOfTheWeek = player[0];
        console.log(this.playerOfTheWeek)
      },
      error: (error) => {
        return error;
      }
    })
  }
  ngOnDestroy() {
    this.playerOfTheWeekSub.unsubscribe();
  }
}
