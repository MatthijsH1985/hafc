import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {catchError, of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  userFormData: FormGroup;
  errorMessage: string = '';
  feedbackMessage: string = ''
  token: string|undefined;
  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.token = undefined;
    this.userFormData = new FormGroup({
      user_name: new FormControl('', Validators.required),
      user_nickname: new FormControl('', Validators.required),
      user_firstname: new FormControl('', Validators.required),
      user_lastname: new FormControl('', Validators.required),
      user_email: new FormControl('', Validators.email),
      user_password: new FormControl('', [Validators.required, this.passwordRequirementsValidator]),
      user_password_repeat: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator })
  }

  ngOnInit() {
    // console.log(this.userFormData.value);
  }

  passwordRequirementsValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8 || !hasNumber || !hasSpecialChar) {
      return { 'passwordRequirements': true };
    }

    return null;
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('user_password')?.value;
    const passwordRepeat = control.get('user_password_repeat')?.value;

    if (password !== null && passwordRepeat !== null && password !== passwordRepeat) {
      control.get('user_password_repeat')?.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    } else {
      control.get('user_password_repeat')?.setErrors(null);
    }

    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8 || !hasNumber || !hasSpecialChar) {
      control.get('user_password')?.setErrors({ 'passwordRequirements': true });
      return { 'passwordRequirements': true };
    } else {
      control.get('user_password')?.setErrors(null);
    }

    return null;
  };


  onSubmitCreateUserForm(form: FormGroup) {
    const formData = JSON.stringify({
      user_login: form.value.user_name,
      user_nicename: form.value.user_nickname,
      user_email: form.value.user_email,
      first_name: form.value.user_firstname,
      last_name: form.value.user_lastname,
      user_password: form.value.user_password
    })
    this.userService.createUser(formData).subscribe({
      next: (result: any) => {
        if (result) {
          this.feedbackMessage = 'Je hebt een e-mail ontvangen waarin je je e-mailadres kunt bevestigen. Wanneer je dit gedaan hebt, kun je inloggen.';
          this.submitted = true;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
