import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayersService} from "../../../../services/players.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DatePipe, ViewportScroller} from "@angular/common";
import {TranslationService} from "../../../../services/translation.service";
import {LoadingIndicatorComponent} from '../../../../core/shared/loading-indicator/loading-indicator.component';
import {CoreModule} from '../../../../core/core.module';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-speler',
  templateUrl: './speler.component.html',
  styleUrls: ['./speler.component.scss'],
  imports: [
    DatePipe,
    LoadingIndicatorComponent,
    CoreModule
  ],
  providers: [
    TranslateService
  ],
  standalone: true
})
export class SpelerComponent implements OnInit, OnDestroy {
  playerId: any = this.activatedRoute.snapshot.paramMap.get('id');
  loading: boolean = true;
  player: any;
  playerSub: Subscription | undefined;
  playerStatsSub: Subscription | undefined;
  playerStats: any = [];
  playerInfo: any = [];
  constructor(private playersService: PlayersService, private translationService: TranslationService, private viewportScroller: ViewportScroller, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
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

  translate(value: string) {
    return this.translationService.translateValue(value);
  }

  getPlayerStats(player: any) {
    this.playerStatsSub = this.playersService.getPlayerStats(player.acf.sportmonks_speler_id).subscribe({
      next: (data: any) => {
        this.playerInfo = data.data;
        const playerData = data.data.statistics[0].details;
        if (playerData) {
          for (const item of playerData) {
            const extractedItem = {
              player_statistic_id: item.player_statistic_id,
              type: {
                name: item.type.name,
              },
              value: {} as {
                total?: number;
                lowest?: number;
                average?: number;
                highest?: number;
              }
            };
            if (item.value && item.value.total !== undefined) {
              extractedItem.value.total = item.value.total;
            }
            if (item.value && item.value.lowest !== undefined) {
              extractedItem.value.lowest = item.value.lowest;
            }
            if (item.value && item.value.average !== undefined) {
              extractedItem.value.average = item.value.average;
            }
            if (item.value && item.value.highest !== undefined) {
              extractedItem.value.highest = item.value.highest;
            }
           this.playerStats.push(extractedItem);
          }
        }

        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy() {
    if (this.playerSub) {
      this.playerSub.unsubscribe();
    }
    if (this.playerStatsSub) {
      this.playerStatsSub.unsubscribe();
    }
  }

}
