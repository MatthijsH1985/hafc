import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(private productsService: ProductsService) {}
  productsSub: Subscription = new Subscription();
  products: any = [];
  noProductsMessage = '';
  ngOnInit() {
    this.productsSub = this.productsService.getProducts(1, 830).subscribe({
      next: (products: any) => {
        this.products = products;
        if (this.products.length < 1) {
          this.noProductsMessage = 'Geen producten gevonden';
        }
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
