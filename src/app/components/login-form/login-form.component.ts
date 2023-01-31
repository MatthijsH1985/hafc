import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user-service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      userName: new FormControl('Matthijs', Validators.required),
      password: new FormControl('Pauper54321!', Validators.required)
    });
  }

  onLogin(loginFormData: FormGroup) {
    const formData = JSON.stringify({
      username: loginFormData.value.userName,
      password: loginFormData.value.password
    });
    this.userService.loginUser(formData).subscribe({
      next: token => {
        localStorage.setItem('token', token.token);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onValidate() {
    const token = localStorage.getItem('token');
    console.log(token);
    this.userService.validateToken(token).subscribe({
      next: user => {
        console.log(user);
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
