import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth-service";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit, OnDestroy {
  loadingUser = true;
  user: any;
  authSub: Subscription | undefined;
  errorMessage: string | undefined;
  constructor(private authService: AuthService, private userService: UserService, private toastrService: ToastrService) {

  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authSub = this.authService.getUserInfo().subscribe({
        next: (user: any) => {
          setTimeout(() => {
            this.user = user;
            this.loadingUser = false;
          }, 1000);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
  ngOnDestroy() {
    if (this.authSub !== undefined) {
      this.authSub.unsubscribe();
    }
  }
}
