import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Config} from "../../../model/config";
import {ConfigService} from "../../../core/services/config.service";
import {environment} from '../../../../environments/environment';
import {SessionService} from '../../services/session';
import  _ from 'lodash';

@Injectable()

export class ShippingService {
  headers: HttpHeaders = new HttpHeaders();
  private cartContentSubject = new BehaviorSubject<any>({ quantity: 0 });
  cartContent$ = this.cartContentSubject.asObservable();

  getHeaders(): HttpHeaders {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Basic ' + btoa('ck_d3f494e8666a090e62a2edb9f54d25cf97a28dd1:cs_1f35f25e3ce306013ab9a6e26a080e3bef71e1a1')
    });
    return this.headers;
  }

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getShippingMethods(): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      observe: 'response',
      withCredentials: true
    };
    // @ts-ignore
    return this.http.get<Config[]>(environment.shopUrl + '/shipping_methods', httpOptions);
  }

  getShippingClasses(): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      observe: 'response',
      withCredentials: true
    };
    // @ts-ignore
    return this.http.get<Config[]>(environment.shopUrl + '/products/shipping_classes', httpOptions);
  }

}
