import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  standalone: true,
  imports: [
    RouterModule
  ]
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
      localStorage.setItem('donationNotification', 'hidden')
    }
  }

  hideDonationBar() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('donationPage', 'hidden');
    }
  }
}
