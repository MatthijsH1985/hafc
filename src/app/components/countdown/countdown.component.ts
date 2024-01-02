import {Component, OnInit} from '@angular/core';
import * as moment from 'moment/moment';

@Component({
  templateUrl: 'countdown.component.html',
  selector: 'app-countdown'
})

export class CountdownComponent implements OnInit {

  days: any;
  hours: any;
  minutes: any;
  seconds: any;

  ngOnInit() {
    this.countDown();
  }

  countDown() {
    const targetDate = moment('2024-02-01');

    // Start de interval om de countdown bij te werken
    setInterval(() => {
      const diff = targetDate.diff(moment());

      const duration = moment.duration(diff);
      this.days = Math.floor(duration.asDays());
      this.hours = duration.hours();
      this.minutes = duration.minutes();
      this.seconds = duration.seconds();
    }, 1000);
  }

}
