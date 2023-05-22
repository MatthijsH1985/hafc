import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth/auth-service";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.router.navigate(['account/details']);
    }
  }

  isLoggedIn() {
     return this.authService.isAuthenticated();
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      if (email) {
        this.authService.login(email, password).pipe(
          catchError((error: any) => {
            this.errorMessage = error.message;
            return of(null);
          })
        ).subscribe((result) => {
          if (result) {
            console.log(result);
            this.router.navigate(['account/details/mijn-gegevens']);
          }
        });
      }
    }
  }
}
