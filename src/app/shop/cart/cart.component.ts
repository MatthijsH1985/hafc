
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { formatCurrency } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import {CartService} from '../cart/services/cart.service';

interface Cart {
  cartItems: CartItem[];
  cartTotals: {
    subtotal_price: number;
    total: string;
    total_tax: number;
    quantity: number;
  };
}

interface CartItem {
  item_key: string;
  title: string;
  featured_image: string;
  permalink: string;
  totals: {
    total: string;
    tax: string;
    subtotal: number;
    subtotal_tax: number;
  };
  quantity: {
    value: number;
  };
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartSub: Subscription = new Subscription();
  formData: FormGroup = new FormGroup({});
  public cart: Cart = {
    cartItems: [],
    cartTotals: {
      subtotal_price: 0,
      total_tax: 0,
      total: '',
      quantity: 0,
    },
  };

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchCart();
  }

  convertLink(permalink: string) {
    const parts = permalink.replace('https://hafc_site.test', 'shop/').split('/');
    const urlParts = parts.filter((deel) => deel.trim() !== '');
    return [''].concat(urlParts);
  }

  onUpdateCart(event: any) {
    console.log(event);
  }

  clearCart() {
    const cartKey = localStorage.getItem('cart_key')
    this.cartService.clearCart(cartKey).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      },
    })
  }

  toNumber(amount: string) {
    return Number(amount);
  }

  onRemoveFromCart(item: any) {
    this.cartService.removeItemFromCart(item).subscribe({
      next: (response: any) => {
        this.fetchCart()
        this.cdr.detectChanges()
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  private fetchCart(): void {
    this.cartService.getCart().subscribe({
      next: (response: any) => {
        console.log(response);
        if (typeof response === 'string' && response.includes('No items in the cart.')) {
          this.cart.cartItems = [];
        } else {
          const cartItemsArray: CartItem[] = Object.values(response);
          cartItemsArray.forEach((cartItem) => {
            const controlName = `quantity-${cartItem.item_key}`;
            const quantityValue = cartItem.quantity;
            console.log(quantityValue)
            this.cart.cartItems = cartItemsArray;
          });
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  private getCartTotals() {
    this.cartService.getCartTotals().subscribe({
      next: (response: any) => {
        this.cart.cartTotals = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

  protected readonly Object = Object;
  protected readonly formatCurrency = formatCurrency;
}
