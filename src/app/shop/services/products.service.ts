import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from "../../model/config";
import {ConfigService} from "../../core/services/config.service";
import {environment} from '../../../environments/environment';

@Injectable()

export class ProductsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Basic ' + btoa('ck_713a189544a36c84cec37f2d54f7cc918be84681:cs_1505f608af0cba240cc7bc728099ca3663f641b7')
    })
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getProducts(page = 1, category = 830): Observable<Config[]> {
    return this.http.get<Config[]>(environment.shopUrl + '' + '/products?category=' + category + '', this.httpOptions);
  }

  getProduct(slug: string): Observable<Config[]> {
    return this.http.get<Config[]>(environment.shopUrl + '' + '/products?slug=' + slug + '', this.httpOptions);
  }

}
