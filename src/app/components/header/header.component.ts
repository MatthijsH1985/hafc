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
  faUser = faUser;
  user: string | null | undefined;

  constructor(private authService: AuthService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUsername() {
    return this.authService.getUserName();
  }

  logOut(): void {
    this.authService.logOut();
  }
}
