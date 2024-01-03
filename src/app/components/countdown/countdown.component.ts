import {Component, OnInit} from '@angular/core';
import * as moment from 'moment/moment';
import {Subscription} from 'rxjs';
import {CountdownService} from './countdown.service';

@Component({
  templateUrl: 'countdown.component.html',
  selector: 'app-countdown'
})

export class CountdownComponent implements OnInit {

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
          this.pageData.acf.link_naar_pagina = this.updatePostPermalink(this.pageData.acf.link_naar_pagina);
        } else {
          this.showWarning = true;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  updatePostPermalink(oldPermalink: string): string {
    if (oldPermalink.startsWith('https://backend.hafc.nl')) {
      return oldPermalink.replace('https://backend.hafc.nl', 'https://www.hafc.nl');
    } else {
      return oldPermalink;
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

}
