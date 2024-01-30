import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, map, Observable, of, Subject, switchMap, tap} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Config} from "../../model/config";
import {ConfigService} from "../../core/services/config.service";
import {environment} from '../../../environments/environment';
import {SessionService} from './session';
import  _ from 'lodash';
import {catchError} from 'rxjs/operators';

@Injectable()

export class CartService {
  headers: HttpHeaders = new HttpHeaders();
  private cartQuantitySubject = new Subject<number>();

  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$: Observable<any[]> = this.cartSubject.asObservable();

  getHeaders(): HttpHeaders {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    });
    return this.headers;
  }

  constructor(private http: HttpClient, private sessionService: SessionService, private configService: ConfigService) {
    this.updateCartQuantityFromServer();
  }

  getLineItems(): Observable<any[]> {
    return this.cart$.pipe(
      switchMap((cartItems) => {
        const lineItems$ = cartItems.map((cartItem) => {
          console.log(cartItem)
          if (cartItem.product) {
            // Als de productgegevens al in de winkelwagen zitten, gebruik deze direct
            return of({
              product_id: cartItem.product.id,
              quantity: cartItem.quantity.value,
              // Voeg andere relevante velden van productDetails toe indien nodig
            });
          } else {
            // Doe iets als er geen productgegevens beschikbaar zijn (bijv. foutafhandeling)
            return of(null);
          }
        });

        return forkJoin(lineItems$).pipe(
          map((lineItems: any) => lineItems.filter((item: any) => item !== null))
        );
      })
    );
  }
  // getCart(): Observable<Config[]> {
  //   const httpOptions = {
  //     headers: this.getHeaders(),
  //     withCredentials: true
  //   };
  //   return this.http.get<Config[]>(environment.shopUrlCustom + '/cart/items', httpOptions);
  // }

  getCart(): Observable<any[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      withCredentials: true
    };

    return this.http.get<any[]>(environment.shopUrlCustom + '/cart/items', httpOptions).pipe(
      tap(cartItems => {
        this.cartSubject.next(cartItems);
      }),
      catchError(error => {
        console.error('Error getting cart:', error);
        return [];
      })
    );
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

  getCartQuantity(): Observable<number> {
    return this.cartQuantitySubject.asObservable();
  }

  updateCartQuantity(quantity: number): void {
    this.cartQuantitySubject.next(quantity);
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

  updateCartItem(cartItem: any): Observable<Config[]> {
    const cartItemKey = cartItem.item_key;
    const updatedQuantity = cartItem.quantity;

    const httpOptions = {
      headers: this.getHeaders(),
      withCredentials: true
    };
    return this.http.post<Config[]>(environment.shopUrlCustom + `/cart/item/${cartItemKey}`, {
      quantity: updatedQuantity
    }, httpOptions);
  }

  private updateCartQuantityFromServer(): void {
    this.getCartCount().subscribe({
      next: (quantity: any) => {
        this.updateCartQuantity(quantity);
      },
      error: (error) => {
        console.log(error)
    }
    })
  }

}
