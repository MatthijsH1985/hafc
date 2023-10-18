import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../services/cart.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../services/session';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  productSub: Subscription = new Subscription()
  cartSub: Subscription = new Subscription()
  productFormData: FormGroup = new FormGroup({});
  product: any;

  constructor(
    private productsService: ProductsService,
    private activeRoute: ActivatedRoute,
    private sessionService: SessionService,
    private cartService: CartService) {
    this.productFormData = new FormGroup({
      product_id: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe({
      next: (result: any) => {
        this.getProduct(result['slug']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }

  getProduct(slug: string) {
    this.productSub = this.productsService.getProduct(slug).subscribe({
      next: (product: any) => {
        this.product = product[0];
        this.productFormData = new FormGroup({
          product_id: new FormControl(this.product.id, Validators.required),
          quantity: new FormControl('1', Validators.required),
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  onAddToCart(formData: FormGroup) {
    const cartData: string = JSON.stringify( {
      product_id: formData.value.product_id,
      quantity: formData.value.quantity
    });
    this.cartSub =  this.cartService.addToCart(cartData).subscribe({
      next: (res: any) => {
        const headers = res?.headers;
        const updatedCartItem = res?.body;
        // const sessionHeader = headers.get('x-wc-session');
        console.log(headers);
        // console.log(sessionHeader)
        console.log(res.body);
        this.sessionService.checkIfSessionExists('x-wc-session').then((itemExists) => {
          if (itemExists) {
            localStorage.setItem('woo-next-cart', JSON.stringify(updatedCartItem));
          } else {
            // this.sessionService.setSession(sessionHeader);
          }
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy() {
    this.productSub.unsubscribe()
  }

  protected readonly faChevronDown = faChevronDown;
}
