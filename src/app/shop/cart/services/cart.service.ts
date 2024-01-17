import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Config} from "../../../model/config";
import {ConfigService} from "../../../core/services/config.service";
import {environment} from '../../../../environments/environment';
import {SessionService} from '../../services/session';
import  _ from 'lodash';

@Injectable()

export class CartService {
  headers: HttpHeaders = new HttpHeaders();
  private cartContentSubject = new BehaviorSubject<any>({ quantity: 0 });
  cartContent$ = this.cartContentSubject.asObservable();

  getHeaders(): HttpHeaders {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    });
    return this.headers;
  }

  constructor(private http: HttpClient, private sessionService: SessionService, private configService: ConfigService) {}

  getCart(): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      withCredentials: true
    };
    return this.http.get<Config[]>(environment.shopUrlCustom + '/cart/items', httpOptions);
  }

  clearCart(cartKey: any): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      withCredentials: true
    };
    return this.http.post<Config[]>(environment.shopUrlCustom + `/cart/clear`, httpOptions);
  }

  removeItemFromCart(itemKey: any): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      withCredentials: true
    };
    return this.http.delete<Config[]>(environment.shopUrlCustom + `/cart/item/${itemKey}`, httpOptions);
  }

  getCartCount(): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      withCredentials: true
    };
    return this.http.get<Config[]>(environment.shopUrlCustom + '/cart/items/count', httpOptions);
  }

  getCartTotals(): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      withCredentials: true
    };
    return this.http.get<Config[]>(environment.shopUrlCustom + '/cart/totals', httpOptions);
  }

  updateCartQuantity(cartContent: any) {
    this.cartContentSubject.next(cartContent);
  }

  addToCart(cartData: string): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      observe: 'response',
      withCredentials: true
    };
    // @ts-ignore
    return this.http.post<Config[]>(environment.shopUrlCustom + '/cart/add-item', cartData, httpOptions);
  }

  updateCart(products: any): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      withCredentials: true
    };

    return this.http.post<Config[]>(environment.shopUrlCustom + '/cart/items', products, httpOptions);
  }

}
