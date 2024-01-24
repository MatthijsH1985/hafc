import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../cart/services/cart.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../services/session';
import {Toast, ToastrService} from 'ngx-toastr';

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
    private toast: ToastrService,
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
      id: String(formData.value.product_id),
      quantity: String(formData.value.quantity)
    });
    this.addToCart(cartData);
  }

  addToCart(cartData: any) {
    this.cartSub =  this.cartService.addToCart(cartData).subscribe({
      next: (res: any) => {
        const cartItem = res?.body;
        this.toast.success('Succesvol toegevoegd');
        const quantity = res.body.item_count;
        this.cartService.updateCartQuantity(quantity)
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
