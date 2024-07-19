import {Component, OnInit} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
  standalone: true,
  imports: [
    CoreModule,
    TabMenuModule
  ]
})
export class CompetitionComponent implements OnInit {
  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
      {
        label: 'Wedstrijdprogramma',
        icon: 'pi pi-home',
        link: ['/', 'club', 'competitie', 'wedstrijdprogramma']
      },
      {
        label: 'Uitslagen',
        icon: 'pi pi-chart-line',
        link: ['/', 'club', 'competitie', 'uitslagen']
      },
      {
        label: 'Stand',
        icon: 'pi pi-list',
        link: ['/', 'club', 'competitie', 'stand']
      }
    ];
  }
}
