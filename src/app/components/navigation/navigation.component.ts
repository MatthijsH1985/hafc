import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth-service";
import {MenuService} from "../../services/menu.service";
import {faUser, faChevronDown} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  faUser = faUser;
  faChevronDown = faChevronDown;
  user: string | null | undefined;

  constructor(private authService: AuthService, public menuService: MenuService) {

  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
