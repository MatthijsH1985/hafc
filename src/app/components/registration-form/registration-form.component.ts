import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {catchError, of} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  userFormData: FormGroup;
  errorMessage: string = '';
  feedbackMessage: string = ''
  token: string|undefined;


  constructor(private userService: UserService, private router: Router) {
    this.token = undefined;
    this.userFormData = new FormGroup({
      user_name: new FormControl('', Validators.required),
      user_nickname: new FormControl('', Validators.required),
      user_firstname: new FormControl('', Validators.required),
      user_lastname: new FormControl('', Validators.required),
      user_email: new FormControl('', Validators.email),
      user_password: new FormControl('', Validators.required),
      user_password_repeat: new FormControl('', Validators.required)
    })
  }

  onSubmitCreateUserForm(form: FormGroup) {
    const formData = JSON.stringify({
      user_login: form.value.user_name,
      user_nicename: form.value.user_nickname,
      user_email: form.value.user_email,
      first_name: form.value.user_firstname,
      last_name: form.value.user_lastname,
      user_password: form.value.user_password
    })
    this.userService.createUser(formData).pipe(
      catchError((error: any) => {
        this.errorMessage = error.error.message;
        return of(null);
      })
    ).subscribe((result:any) => {
      if (result) {
        this.feedbackMessage = 'Gelukt, je bent succesvol geregistreerd. je kunt nu inloggen';
        setTimeout(() => {
          this.router.navigateByUrl('/account/login');
        }, 3000)
      }
    });
  }

}
