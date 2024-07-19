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
export class CompetitionComponent {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  constructor() {
    this.items = [
      {
        label: 'Uitslagen',
        link: ['/', 'club', 'competitie', 'uitslagen']
      },
      {
        label: 'Wedstrijdprogramma',
        link: ['/', 'club', 'competitie', 'wedstrijdprogramma']
      },
      {
        label: 'Stand',
        link: ['/', 'club', 'competitie', 'stand']
      }
    ];

    this.activeItem = this.items[1];
  }
}
