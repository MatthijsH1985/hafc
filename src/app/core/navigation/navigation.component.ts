import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from "../../services/auth/auth-service";
import {MenuService} from "../../services/menu.service";
import {faChevronDown, faBeer, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {SessionService} from '../../shop/services/session';
import {CartService} from '../../shop/cart/services/cart.service';
import {map, Subscription} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  user: string | null | undefined;
  faChevronDown = faChevronDown;
  itemCount: any;
  cartContent: any;
  cartSub: Subscription = new Subscription();
  addedProducts: any;
  cartQuantity = 0;

  constructor(private authService: AuthService,
              private cartService: CartService,
              private sessionService: SessionService,
              public menuService: MenuService
  ) {

  }

  ngOnInit() {
    this.cartService.cartContent$.subscribe(cartContent => {
      this.cartQuantity = cartContent.quantity;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  hasCartItem() {
    // this.cartService.itemCountSubject.subscribe(count => {
    //   this.itemCount = count;
    // });
    // this.sessionService.checkIfSessionExists('x-wc-session').then((itemExists) => {
    //   if (itemExists) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    return true
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

  protected readonly faShoppingCart = faShoppingCart;
}
