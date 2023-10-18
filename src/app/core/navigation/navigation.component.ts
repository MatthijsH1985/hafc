import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth-service";
import {MenuService} from "../../services/menu.service";
import {faChevronDown, faBeer, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {LocalStorage} from '../services/local-storage';
import {SessionService} from '../../shop/services/session';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  user: string | null | undefined;
  faChevronDown = faChevronDown;
  faBeer = faBeer;

  constructor(private authService: AuthService, private sessionService: SessionService, public menuService: MenuService) {

  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  hasCartItem() {
    // this.sessionService.checkIfSessionExists('x-wc-session').then((itemExists) => {
    //   if (itemExists) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    return true
  }

  protected readonly faShoppingCart = faShoppingCart;
}
