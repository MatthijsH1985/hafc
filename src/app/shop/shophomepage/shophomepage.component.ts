import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shophomepage',
  templateUrl: './shophomepage.component.html',
  styleUrls: ['./shophomepage.component.scss']
})
export class ShopHomepageComponent implements OnInit, OnDestroy {

  productsSub: Subscription = new Subscription();
  products: any = [];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsSub = this.productsService.getProducts(1, 830).subscribe({
      next: (products: any) => {
        this.products = products;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
