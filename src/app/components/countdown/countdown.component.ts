import {Component, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output, PLATFORM_ID} from '@angular/core';
import moment from 'moment/moment';
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
  commentsSidebarVisible = false;
  post: any;
  commentPanelOpen = false;
  reloadComments = false;
  @Output() onShowCommentsSidebar = new EventEmitter<any>();

  constructor(private countdownService: CountdownService,
              private zone: NgZone) {
  }
  ngOnInit() {
    this.countdownSub = this.countdownService.getCountdown(this.homepageId).subscribe({
      next: (response: any) => {
        if (response.acf.countdown_weergeven) {
          this.post = response;
          const targetDate = this.post.acf.datum;
          this.countDown(targetDate);
          this.showWarning = false;
          this.post.acf.link_naar_pagina = this.parsePermalinkToArray(this.post.acf.link_naar_pagina);
        } else {
          this.showWarning = true;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  toggleCommentSidebar(): void {
    this.onShowCommentsSidebar.emit({
      visible: true,
      post: this.post
    });
  }

  openComments() {
    this.commentPanelOpen = true;
  }

  closeComments() {
    this.commentPanelOpen = false;
  }

  parsePermalinkToArray(permalink: string): string[] {
    const regex = /https:\/\/backend\.hafc\.nl\/nieuws\/(\d+)\/(.+)/;
    if (permalink.length > 0) {
      const match = permalink.match(regex);
      if (match && match.length === 3) {
        const nummer = match[1];
        const titel = match[2].replace(/-/g, ' ').replace(/\//g, '').trim(); // Verwijder spaties aan het begin en einde
        return ['nieuws', nummer, titel];
      }
    }
    return [];
  }

  countDown(targetDate: any) {
    const formattedTargetDate = moment(targetDate);
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        const diff = formattedTargetDate.diff(moment());
        const duration = moment.duration(diff);
        this.days = Math.floor(duration.asDays());
        this.hours = duration.hours();
        this.minutes = duration.minutes();
        this.seconds = duration.seconds();
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.countdownSub.unsubscribe();
  }

}
