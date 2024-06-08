import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit{

  constructor(private router: Router, @Inject('isBrowser') @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.hideDonationNotification();
    this.hideDonationBar();
  }

  hideDonationNotification() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('donationNotification', 'hide')
    }
  }

  hideDonationBar() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('donationPage', 'hide');
    }
  }
}
