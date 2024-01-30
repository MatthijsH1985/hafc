import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Cart, CartItem} from '../model/cart.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrdersServices} from '../services/orders.services';
import {LoadingIndicatorService} from '../../core/shared/loading-indicator/loading-indicator.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

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
      shipping_tax: 0
    },
  };
  checkoutData: FormGroup = new FormGroup({});

  constructor( private cartService: CartService,
               private loadingIndicatorService:LoadingIndicatorService,
               private ordersService: OrdersServices) {
    this.formData = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address_1: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      houseNumber: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('NL', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.fetchCartTotals();
  }

  fixedNumber(price: any) {
    return price.toFixed(1);
  }

  calculateShippingInclBtw(shippingExTax: any, shippingTax: any): string {
    const shippingExTaxParsed = parseFloat(shippingExTax);
    const shippingTaxParsed = parseFloat(shippingTax);
    const shippingInBtw = shippingExTaxParsed + shippingTaxParsed;
    return (shippingInBtw).toFixed(2);
  }

  onProceedPayment(paymentDetails: any): void {
    if (this.formData.valid) {
      this.cartService.getCart().subscribe({
        next: (response: any) => {
          if (typeof response === 'string' && response.includes('No items in the cart.')) {
            this.emptyString = 'Je winkelwagen is leeg';
            this.cart.cartItems = [];
          } else {
            const cartItemsArray: CartItem[] = Object.values(response);
            cartItemsArray.forEach((cartItem) => {
              this.cart.cartItems = cartItemsArray;
            });
            const formData = {
              first_name: String(paymentDetails.value.firstName),
              last_name: String(paymentDetails.value.lastName),
              address_1: String(paymentDetails.value.address_1),
              zip_code: String(paymentDetails.value.zipCode),
              house_number: String(paymentDetails.value.houseNumber),
              city: String(paymentDetails.value.city),
              country: String(paymentDetails.value.country),
              email: String(paymentDetails.value.email),
              phone: String(paymentDetails.value.phone)
            };
            const orderData = {
              payment_method: "iDeal",
              payment_method_title: "iDeal",
              set_paid: false,
              billing: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                address_1: formData.address_1,
                address_2: "",
                city: formData.city,
                state: "",
                postcode: formData.zip_code,
                country: formData.country,
                email: formData.email,
                phone: formData.phone
              },
              shipping: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                address_1: formData.address_1,
                address_2: "",
                city: formData.city,
                state: "",
                postcode: formData.zip_code,
                country: formData.country,
                email: formData.email,
                phone: formData.phone
              },
              line_items: [
                {
                  product_id: 93,
                  quantity: 2
                },
                {
                  product_id: 22,
                  variation_id: 23,
                  quantity: 1
                }
              ],
              shipping_lines: [
                {
                  method_id: "bezorgen",
                  method_title: "Bezorgen",
                  total: "2.48"
                }
              ]
            };
            orderData.line_items = cartItemsArray.map(cartItem => ({
              product_id: cartItem.id,
              quantity: cartItem.quantity.value
            }));
            this.onPlaceOrder(JSON.stringify(orderData));
          }
          this.fetchCartTotals();
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    } else {
      this.markInvalidFields();
    }
  }

  private markInvalidFields(): void {
    // Loop door elk formulierelement en markeer ongeldige velden
    Object.keys(this.formData.controls).forEach(controlName => {
      const control = this.formData.get(controlName);
      if (control && control.invalid) {
        control.markAsTouched();  // Markeer als aangeraakt om visuele weergave te activeren
      }
    });
  }

  private onPlaceOrder(orderData: any) {
    this.loadingIndicatorService.setLoading(true);
    this.ordersService.addOrder(orderData).subscribe({
      next: (response: any) => {
        setTimeout(() => {
          this.loadingIndicatorService.setLoading(false);
          window.open(response.body.payment_url);
        }, 1000)
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
