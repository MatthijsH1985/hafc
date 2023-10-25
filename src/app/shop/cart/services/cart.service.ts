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

  getHeadersWithSession(): HttpHeaders {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Headless-CMS': 'true'
    });
    const session: any = this.sessionService.getCartSession();
    if (session !== undefined || session !== '') {
      this.headers = this.headers.set('x-wc-session', session);
    }

    return this.headers;
  }

  constructor(private http: HttpClient, private sessionService: SessionService, private configService: ConfigService) {}

  getCart(): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeadersWithSession(),
      withCredentials: true
    };
    return this.http.get<Config[]>(environment.shopUrlCustom + '/cart/items', httpOptions);
  }

  updateCart(cartContent: any) {
    this.cartContentSubject.next(cartContent);
  }

  getCartQuantity() {
    return 5;
  }

  addToCart(cartData: string): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeadersWithSession(),
      observe: 'response',
      withCredentials: true
    };
    // @ts-ignore
    return this.http.post<Config[]>(environment.shopUrlCustom + '/cart/items', cartData, httpOptions);
  }

  // updateCart(products: any): Observable<Config[]> {
  //   const httpOptions = {
  //     headers: this.getHeadersWithSession(),
  //     withCredentials: true
  //   };
  //
  //   return this.http.post<Config[]>(environment.shopUrlCustom + '/cart/items', products, httpOptions);
  // }

}
