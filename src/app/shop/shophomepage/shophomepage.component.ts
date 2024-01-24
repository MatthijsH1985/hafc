import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shophomepage',
  templateUrl: './shophomepage.component.html',
  styleUrls: ['./shophomepage.component.scss']
})
export class ShopHomepageComponent {

  constructor(private productsService: ProductsService) {
  }


}
