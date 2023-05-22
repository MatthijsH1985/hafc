import {Component, OnInit} from '@angular/core';
import {PlayersService} from "../../../services/players.service";

@Component({
  selector: 'app-player-of-the-week',
  templateUrl: './player-of-the-week.component.html',
  styleUrls: ['./player-of-the-week.component.scss']
})
export class PlayerOfTheWeekComponent implements OnInit{
  playerOfTheWeek: any;
  constructor(private playersService: PlayersService) {
  }
  ngOnInit() {
    this.playersService.getPlayers().subscribe({
      next: (players: any) => {
        for(let i = 0; i < players.length; i++) {
          if (players[i].acf.speler_van_de_week) {
            this.playerOfTheWeek = players[i];
          }
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }
}
