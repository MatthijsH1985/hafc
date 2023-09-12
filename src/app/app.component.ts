import {Component, OnInit} from '@angular/core';
import {slideInAnimation} from "./core/shared/animations";
import {LoadingIndicatorService} from "./core/shared/loading-indicator/loading-indicator.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ],
})
export class AppComponent implements OnInit {

  public loading: boolean = false;

  constructor(private loadingIndicatorService: LoadingIndicatorService, private translationService: TranslateService ){}

  ngOnInit() {
    this.translationService.use('nl');
    this.loadingIndicatorService.loading$.subscribe((loading) => {
      this.loading = loading
    });
  }

}
