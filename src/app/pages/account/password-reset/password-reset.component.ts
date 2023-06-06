import {Component, KeyValueDiffers, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {Router} from "@angular/router";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
constructor(private userService: UserService, private viewportScroller: ViewportScroller,  private router: Router, private recaptchaV3Service: ReCaptchaV3Service,) {
  this.token = undefined;
}

  feedbackMessage: any;
  errorMessage: any = '';
  token: string|undefined;
  key: any = environment.recaptcha.siteKey;
  message = ''

  userData: FormGroup = new FormGroup({
    recaptchaReactive: new FormControl(null, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  public log: string[] = [];

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
  }

  onSubmitForm() {
    this.recaptchaV3Service.execute('myAction').subscribe(
      (token) => {
        this.executeRecaptchaV3();
        const email = this.userData.get('email')?.value;
        this.onSendResetlink(email);
      },
      (error) => {
        console.log(`Recaptcha v3 error:`, error);
      }
    );
  }

  public executeRecaptchaV3() {
    this.log.push(`Recaptcha v3 execution requested...`);
    this.recaptchaV3Service.execute('myAction').subscribe(
      (token) => {
        this.addTokenLog('Recaptcha v3 token', token);
      },
      (error) => {
        this.log.push(`Recaptcha v3 error: see console`);
        console.log(`Recaptcha v3 error:`, error);
      }
    );
  }

  public formatToken(token: string | null) {
    return token !== null
      ? `${token.substring(0, 7)}...${token.substring(token.length - 7)}`
      : 'null';
  }

  public addTokenLog(message: string, token: any | null) {
    this.log.push(`${message}: ${this.formatToken(token)}`);
  }

  onSendResetlink(formData: string) {
    const email = JSON.stringify({
      email: formData
    });
    this.userService.forgetPassWord(email).subscribe({
      next: (result: any) => {
        console.log(result);
        this.message = 'Moment, je wordt automatisch doorgestuurd.';
        setTimeout(() => {
          return this.router.navigate(['/account', 'set-new-password']);
        }, 3000);
      },
      error: error => {
        this.errorMessage = error.error.message
      },
    });
  }
}
