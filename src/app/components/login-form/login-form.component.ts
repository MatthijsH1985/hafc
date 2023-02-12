import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  showError: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
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
      next: loginResponse => {
        this.authService.setUser(JSON.stringify(loginResponse));
        this.authService.setLoginStatus(true);
        this.router.navigateByUrl('account/details');
      },
      error: error => {
        this.showError = true;
      }
    })
  }
}
