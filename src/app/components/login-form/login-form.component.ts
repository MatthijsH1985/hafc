import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth/auth-service";
import {Router} from "@angular/router";
import {catchError, of, timer} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

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

  constructor(private authService: AuthService, private router: Router,
              @Inject(PLATFORM_ID)
              private platformId: any) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.router.navigate(['/']);
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
          console.log(result)
          if (result) {
            if (isPlatformBrowser(this.platformId)) {
              this.router.navigateByUrl('/account/details/mijn-gegevens');
            }
          }
        });
      }
    }
  }
}
