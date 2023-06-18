import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth-service";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  loadingUser = true;
  user: any;
  errorMessage: string | undefined;
  constructor(private authService: AuthService, private userService: UserService, private toastrService: ToastrService) {

  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.getUserInfo().subscribe({
        next: (user: any) => {
          this.user = user;
          console.log(user);
          this.loadingUser = false;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
