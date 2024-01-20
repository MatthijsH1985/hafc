import {Component, OnInit} from '@angular/core';
import {ShippingService} from '../cart/services/shipping.service';
import {CartService} from '../cart/services/cart.service';
import {ShippingMethod} from '../model/shipping-method.model';
import {Cart} from '../model/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  shippingMethods: ShippingMethod[] = [];
  shippingClasses: any;
  public cart: Cart = {
    cartItems: [],
    cartTotals: {
      subtotal_price: 0,
      total_tax: 0,
      total: '',
      quantity: 0,
    },
  };

  constructor(private shippingService: ShippingService, private cartService: CartService) {
  }
  ngOnInit() {
    this.fetchShippingMethods();
    this.fetchCartTotals();
    this.fetchShippingClasses();
  }

  private fetchShippingMethods() {
    this.shippingService.getShippingMethods().subscribe({
      next: (response: any) => {
        this.shippingMethods = response.body.map((method: any) => ({
          id: method.id,
          description: method.description,
          title: method.title
        }));
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  private fetchShippingClasses() {
    this.shippingService.getShippingClasses().subscribe({
      next: (response: any) => {
        this.shippingClasses = response;
        console.log(this.shippingClasses);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  private fetchCartTotals() {
    this.cartService.getCartTotals().subscribe({
      next: (response: any) => {
        this.cart.cartTotals = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }



  toNumber(amount: string) {
    return Number(amount);
  }

}
