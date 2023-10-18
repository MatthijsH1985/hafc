import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartSub: Subscription = new Subscription();
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartSub = this.cartService.getCart().subscribe({
      next: (cartContent: any) => {
        console.log(cartContent);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
