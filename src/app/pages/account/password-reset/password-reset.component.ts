import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
constructor(private userService: UserService) { }

  feedbackMessage: any;
  errorMessage: any;

  userData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmitForm() {
    const email = this.userData.get('email')?.value;
    this.onSendResetlink(email);
  }

  onSendResetlink(formData: string) {
    const email = JSON.stringify({
      email: formData
    });
    console.log(email)
    this.userService.forgetPassWord(email).subscribe({
      next: (result: any) => {
        console.log(result);
        this.feedbackMessage = result.message;
      },
      error: error => {
        console.log(error);
        this.errorMessage = error.error.message
      }
    });
  }
}
