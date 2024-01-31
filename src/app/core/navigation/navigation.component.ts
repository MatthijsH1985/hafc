import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from "../../services/auth/auth-service";
import {MenuService} from "../../services/menu.service";
import {faChevronDown, faBeer, faShoppingCart, faTimes} from '@fortawesome/free-solid-svg-icons';
import {SessionService} from '../../shop/services/session';
import {CartService} from '../../shop/services/cart.service';
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
  menuOpen = false;

  constructor(private authService: AuthService,
              private cartService: CartService,
              private sessionService: SessionService,
              public menuService: MenuService
  ) {

  }

  ngOnInit() {
    this.cartService.getCartQuantity().subscribe((quantity: number) => {
      this.cartQuantity = quantity;
    });
    this.menuService.isOpen.subscribe({
      next: (isOpen) => {
        this.menuOpen = isOpen;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faTimes = faTimes;
}
