import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from './services/cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartSub: Subscription = new Subscription();
  products: any = [];
  productCount: any;
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartSub = this.cartService.getCart().subscribe({
      next: (cartContent: any) => {
        this.products = cartContent;
        this.productCount = cartContent.quantity;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
}
