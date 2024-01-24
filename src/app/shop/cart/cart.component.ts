
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { formatCurrency } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import {CartService} from '../cart/services/cart.service';
import {Cart, CartItem} from '../model/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartSub: Subscription = new Subscription();
  formData: FormGroup = new FormGroup({});
  emptyString = '';
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

  onUpdateCart(event: any, cartItem: CartItem) {
    const updatedQuantity = event.target.value;
    const updatedCartItem = { ...cartItem, quantity: updatedQuantity };
    this.cartService.updateCartItem(updatedCartItem).subscribe({
      next: (response: any) => {
        this.fetchCart();
        const quantity = response.item_count;
        this.cartService.updateCartQuantity(quantity);
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.log(error)
      }
    })
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
        if (typeof response === 'string' && response.includes('No items in the cart.')) {
          this.emptyString = 'Je winkelwagen is leeg';
          this.cart.cartItems = [];
        } else {
          const cartItemsArray: CartItem[] = Object.values(response);
          cartItemsArray.forEach((cartItem) => {
            const controlName = `quantity-${cartItem.item_key}`;
            const quantityControl = new FormControl(cartItem.quantity.value);
            this.formData.addControl(controlName, quantityControl);
            this.cart.cartItems = cartItemsArray;
          });
        }
        this.fetchCartTotals();
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

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

  protected readonly Object = Object;
}
