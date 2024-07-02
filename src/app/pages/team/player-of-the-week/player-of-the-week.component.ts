import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayersService} from "../../../services/players.service";
import {Subscription} from "rxjs";
interface PlayerOfTheWeek {
  ID: number;
  playerName: string;
  slug: string;
  image: string;
}
@Component({
  selector: 'app-player-of-the-week',
  templateUrl: './player-of-the-week.component.html',
  styleUrls: ['./player-of-the-week.component.scss'],
  standalone: true
})
export class PlayerOfTheWeekComponent implements OnInit, OnDestroy{
  playerOfTheWeek: PlayerOfTheWeek | undefined;
  showPlayerOfTheWeek = false;
  playerOfTheWeekSub: Subscription = new Subscription();

  constructor(private playersService: PlayersService) {
  }
  ngOnInit() {
    this.playerOfTheWeekSub = this.playersService.getPlayerOfTheWeek().subscribe({
      next: (player: any) => {
        this.generatePlayerOfTheWeek(player)
      },
      error: (error) => {
        return error;
      }
    })
  }
  generatePlayerOfTheWeek(player: any) {
    if (player[0].title.rendered == 'Geen') {
      this.showPlayerOfTheWeek = false;
    } else {
      this.showPlayerOfTheWeek = true;
      this.playerOfTheWeek = {
        ID: player[0].acf.speler_van_de_week?.ID,
        playerName: player[0]?.acf?.speler_van_de_week?.post_title,
        slug: player[0]?.acf?.speler_van_de_week?.post_name,
        image: player[0]?.better_featured_image?.source_url
      }
    }
  }
  ngOnDestroy() {
    this.playerOfTheWeekSub.unsubscribe();
  }
}
