import {Component, OnInit} from '@angular/core';
import {PlayersService} from "../../../services/players.service";

@Component({
  selector: 'app-selectie',
  templateUrl: './selectie.component.html',
  styleUrls: ['./selectie.component.scss'],
  standalone: true
})
export class SelectieComponent implements OnInit{
  team = {
    Keeper: {},
    Verdediger: {},
    Middenvelder: {},
    Aanvaller: {}
  };
  keepers: any = [];
  verdedigers: any = [];
  middenvelders: any = [];
  aanvallers: any = [];
  loading: any = [];

  constructor(private playerService: PlayersService) {}

  ngOnInit() {
    this.loading = true;
    this.playerService.getPlayers().subscribe( {
      next: data => {
        this.groupPlayers(data);
        this.loading = false;
        this.keepers = this.team.Keeper;
        if (this.keepers) {
          this.keepers.sort((a:any, b:any) => a.acf.rugnummer.localeCompare(b.acf.rugnummer, {numeric: true, sensitivity: 'base'}));
        }
        this.verdedigers = this.team.Verdediger;
        if (this.verdedigers) {
          this.verdedigers.sort((a:any, b:any) => Number(a.acf.rugnummer) - Number(b.acf.rugnummer));
        }
        this.middenvelders = this.team.Middenvelder;
        if (this.middenvelders) {
          this.middenvelders.sort((a:any, b:any) => Number(a.acf.rugnummer) - Number(b.acf.rugnummer));
        }
        this.aanvallers = this.team.Aanvaller;
        if (this.aanvallers) {
          this.aanvallers.sort((a:any, b:any) => Number(a.acf.rugnummer) - Number(b.acf.rugnummer));
        }
      },
      error: error => {
        this.loading = false;
      }
    });
  }

  groupPlayers(team: any) {
    this.team = team.reduce((result: any, item: any) => {
      const app = result[item.acf.positie] = result[item.acf.positie] || [];
      app.push(item);
      return result;
    }, {});
  }
}
