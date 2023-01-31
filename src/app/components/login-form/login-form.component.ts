import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth-service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin(loginFormData: FormGroup) {
    const formData = JSON.stringify({
      username: loginFormData.value.userName,
      password: loginFormData.value.password
    });
    this.authService.loginUser(formData).subscribe({
      next: token => {
        this.authService.setToken(token.token);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onValidate() {
    const token = localStorage.getItem('token');
    console.log(token);
    this.authService.validateToken(token).subscribe({
      next: user => {
        console.log(user);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
