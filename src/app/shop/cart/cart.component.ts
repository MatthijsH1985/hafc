
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import {CartService} from '../services/cart.service';
import {Cart, CartItem} from '../model/cart.model';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {ShippingService} from '../services/shipping.service';
import {ShippingMethod} from '../model/shipping-method.model';

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
      shipping_total: 0,
      shipping_tax: 0,
    }
  };

  shippingMethods: ShippingMethod[] = [];
  shippingClasses: any;

  constructor(private cartService: CartService, private shippingService: ShippingService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchCart();
    this.fetchShippingClasses();
  }

  fixedNumber(price: any) {
    return price.toFixed(1);
  }

  calcIncTax(price: any) {
    return price.total + price.tax;
  }

  calculateShippingInclBtw(shippingExTax: any, shippingTax: any): string {
    const shippingExTaxParsed = parseFloat(shippingExTax);
    const shippingTaxParsed = parseFloat(shippingTax);
    const shippingInBtw = shippingExTaxParsed + shippingTaxParsed;
    return (shippingInBtw).toFixed(2);
  }

  convertLink(permalink: string) {
    const parts = permalink.replace('https://backend.hafc.nl', 'shop/').split('/');
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

  toNumber(amount: string) {
    return Number(amount);
  }

  private fetchShippingClasses() {
    this.shippingService.getShippingClasses().subscribe({
      next: (response: any) => {
        this.shippingClasses = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onRemoveFromCart(item: any) {
    this.cartService.removeItemFromCart(item).subscribe({
      next: (response: any) => {
        this.cartService.updateCartQuantity(response.items.length);
        if (response.items.length > 0) {
          this.fetchCart();
          this.cdr.detectChanges()
        } else {
          this.emptyString = 'Je winkelwagen is leeg';
          this.cart.cartItems = [];
        }
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
          console.log(response)
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
        console.log(this.cart.cartTotals)
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
  protected readonly faTimes = faTimes;
}
