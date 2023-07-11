import {Component, OnInit} from '@angular/core';
import {PlayersService} from "../../../services/players.service";
import {TeamService} from "../../../services/team.service";
import {Router} from "@angular/router";
import {MetaService} from "../../../services/meta.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-selectie',
  templateUrl: './selectie.component.html',
  styleUrls: ['./selectie.component.scss']
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

  constructor(private playerService: PlayersService,
              private teamService: TeamService,
              private router: Router,
              private metaService: MetaService,
              private title: Title,
              private meta: Meta) {}

  ngOnInit() {
    // this.metaService.updateMetaTag(this.router.url, 'Bekijk hier de complete selectie van Heracles Almelo');
    this.meta.getTag("name='description'")
    this.title.setTitle('Selectie - HAFC.nl')
    this.loading = true;
    this.playerService.getPlayers().subscribe( {
      next: data => {
        console.log(data);
        this.groupPlayers(data);
        this.loading = false;
        this.keepers = this.team.Keeper;
        this.keepers.sort((a:any, b:any) => a.acf.rugnummer.localeCompare(b.acf.rugnummer, {numeric: true, sensitivity: 'base'}));
        this.verdedigers = this.team.Verdediger;
        this.verdedigers.sort((a:any, b:any) => Number(a.acf.rugnummer) - Number(b.acf.rugnummer));
        this.middenvelders = this.team.Middenvelder;
        this.middenvelders.sort((a:any, b:any) => Number(a.acf.rugnummer) - Number(b.acf.rugnummer));
        this.aanvallers = this.team.Aanvaller;
        this.aanvallers.sort((a:any, b:any) => Number(a.acf.rugnummer) - Number(b.acf.rugnummer));
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

  onViewPlayer(player:any) {
    this.router.navigateByUrl(`team/${player.id}`);
  }
}
