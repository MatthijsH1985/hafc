import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {faChevronDown, faBeer, faShoppingCart, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  faChevronDown = faChevronDown;
  menuOpen = false;

  constructor(public menuService: MenuService) {

  }

  ngOnInit() {
    this.menuService.isOpen.subscribe({
      next: (isOpen) => {
        this.menuOpen = isOpen;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy() {
    // this.cartSub.unsubscribe();
  }

  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faTimes = faTimes;
}
