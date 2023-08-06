import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {
  constructor(private userService: UserService, private viewportScroller: ViewportScroller) {}
  userData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    authorizationcode: new FormControl('', Validators.required)
  });
  feedbackMessage: any = '';

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
  }

  onSubmitForm() {
    const emailAddress = this.userData.get('email')?.value;
    const password = this.userData.get('password')?.value;
    const authorizationCode = this.userData.get('authorizationcode')?.value;
    const payload = JSON.stringify({
      email: emailAddress,
      password: password,
      code: authorizationCode
    });
    if (emailAddress && authorizationCode) {
      this.onResetPassword(payload);
    }
  }

  onResetPassword(payload: string) {
    this.userService.setUserPassword(payload).subscribe({
      next: (result: any) => {
        console.log(result);
        this.feedbackMessage = result.message;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  onValidateCode(payload: string) {
    this.userService.validateCode(payload).subscribe({
      next: (result: any) => {
        console.log(result)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
