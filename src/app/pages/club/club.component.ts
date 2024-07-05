import { Component } from '@angular/core';
import {CardModule} from 'primeng/card';
import {CoreModule} from '../../core/core.module';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [
    CardModule,
    CoreModule,
    RouterLink,
    Button
  ],
  templateUrl: './club.component.html',
  styleUrl: './club.component.scss'
})
export class ClubComponent {

}
