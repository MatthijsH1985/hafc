import {Component} from '@angular/core';

@Component({
  templateUrl: 'loading-indicator.component.html',
  selector: 'app-loading-indicator',
  styleUrls: ['loading-component.scss']
})

export class LoadingIndicatorComponent {
  loading: boolean = false;
}
