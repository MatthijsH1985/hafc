import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment/moment';
import {Subscription} from 'rxjs';
import {CountdownService} from './countdown.service';

@Component({
  templateUrl: 'countdown.component.html',
  selector: 'app-countdown'
})

export class CountdownComponent implements OnInit, OnDestroy {

  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  countdownSub = new Subscription();
  showWarning = false;
  warning = 'Er is geen evenement';
  homepageId = 23186;
  pageData: any;

  constructor(private countdownService: CountdownService) {

  }
  ngOnInit() {
    this.countdownSub = this.countdownService.getCountdown(this.homepageId).subscribe({
      next: (response: any) => {
        if (response.acf.countdown_weergeven) {
          this.pageData = response;
          const targetDate = this.pageData.acf.datum;
          this.countDown(targetDate);
          this.showWarning = false;
          this.pageData.acf.link_naar_pagina = this.parsePermalinkToArray(this.pageData.acf.link_naar_pagina);
          console.log(this.pageData.acf.link_naar_pagina)
        } else {
          this.showWarning = true;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  parsePermalinkToArray(permalink: string): string[] {
    const regex = /https:\/\/backend\.hafc\.nl\/nieuws\/(\d+)\/(.+)/;
    const match = permalink.match(regex);

    if (match && match.length === 3) {
      const nummer = match[1];
      const titel = match[2].replace(/-/g, ' ').replace(/\//g, '').trim(); // Verwijder spaties aan het begin en einde
      return ['nieuws', nummer, titel];
    } else {
      return [];
    }
  }

  countDown(targetDate: any) {
    const formattedTargetDate = moment(targetDate);
    setInterval(() => {
      const diff = formattedTargetDate.diff(moment());
      const duration = moment.duration(diff);
      this.days = Math.floor(duration.asDays());
      this.hours = duration.hours();
      this.minutes = duration.minutes();
      this.seconds = duration.seconds();
    }, 1000);
  }

  ngOnDestroy() {
    this.countdownSub.unsubscribe();
  }

}
