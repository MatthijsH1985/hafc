import { Component } from '@angular/core';
import {CoreModule} from '../../core/core.module';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [
    CoreModule
  ],
  standalone: true
})
export class NotFoundComponent {

}
