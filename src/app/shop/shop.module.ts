import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from "../core/core.module";
import {RouterModule} from "@angular/router";
import {CommentsModule} from "../comments/comments.module";
import {ProductsService} from './services/products.service';
import { ShopHomepageComponent } from './shophomepage/shophomepage.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import {CartService} from './services/cart.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import {ShippingService} from './services/shipping.service';
import {OrdersServices} from './services/orders.services';
import { ConfirmationComponent } from './checkout/confirmation/confirmation.component';

@NgModule({
  declarations: [
    ShopHomepageComponent,
    CartComponent,
    ProductComponent,
    ProductsComponent,
    CheckoutComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    CommentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [

  ],
  providers: [
    ProductsService,
    CartService,
    ShippingService,
    OrdersServices
  ]
})
export class ShopModule { }
