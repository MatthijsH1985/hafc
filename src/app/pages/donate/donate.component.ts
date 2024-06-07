import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DonateService} from '../../services/donate.service';
import {Subscription} from 'rxjs';

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
  amounts: number[] = [5, 10, 20, 50, 100];
  donationForm: FormGroup;
  donateSub = new Subscription();

  constructor(private donateService: DonateService) {
    this.donationForm = new FormGroup({
      name: new FormControl('Matthijs', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
        name: donationForm.value.name,
        email: donationForm.value.email,
        amount: donationForm.value.amount
      }
    );
    console.log('On Donate:' + donateForm);
    this.donateSub = this.donateService.addDonation(donateForm).subscribe({
      next: result => {
        console.log(result);
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
