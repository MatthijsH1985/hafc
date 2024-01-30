import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Config} from "../../model/config";
import {ConfigService} from "../../core/services/config.service";
import {environment} from '../../../environments/environment';

@Injectable()

export class OrdersServices {
  headers: HttpHeaders = new HttpHeaders();

  getHeaders(): HttpHeaders {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Basic ' + btoa(environment.key)
    });
    return this.headers;
  }

  constructor(private http: HttpClient, private configService: ConfigService) {}

  addOrder(orderData: string): Observable<Config[]> {
    const httpOptions = {
      headers: this.getHeaders(),
      observe: 'response',
      withCredentials: true
    };
    // @ts-ignore
    return this.http.post<Config[]>(environment.shopUrl + '/orders', orderData, httpOptions);
  }

}
