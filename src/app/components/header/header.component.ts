import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth-service";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedIn: boolean = false;
  user: any = {};
  faUser = faUser;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated();
    this.authService.getLoginStatus().subscribe({
      next: value => {
        this.loggedIn = value;
        this.user = this.authService.getUser();
      },
      error: err => {
        console.log(err);
       }
    })
  }
}
