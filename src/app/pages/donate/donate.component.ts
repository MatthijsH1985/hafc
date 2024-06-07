import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DonateService} from '../../services/donate.service';
import {Subscription} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  providers: [DonateService],
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit, OnDestroy {
  name: string = '';
  email: string = '';
  amount: number = 5;
  amounts: number[] = [5, 10, 15, 20, 25, 40, 50, 75, 100, 250];
  donationForm: FormGroup;
  donateSub = new Subscription();

  constructor(private donateService: DonateService, @Inject('isBrowser') @Inject(PLATFORM_ID) private platformId: Object,) {
    this.donationForm = new FormGroup({
      description: new FormControl('Nieuwe donatie', [Validators.required]),
      amount: new FormControl(this.amount, [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.donateSub.unsubscribe();
  }

  startMolliePayment(donationForm: FormGroup) {
    const donateForm = JSON.stringify({
        description: donationForm.value.description,
        amount: donationForm.value.amount
      }
    );
    if (isPlatformBrowser(this.platformId)) {
      this.donateSub = this.donateService.addDonation(donateForm).subscribe({
        next: (result: any) => {
          window.location.href = result.checkoutUrl;
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
}
