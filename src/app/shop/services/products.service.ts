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
      'Authorization': 'Basic ' + btoa('ck_42bfce6f7023aefda6fdfb791424a911605f1217:cs_6bf2ce3713f644aad9a6e458e928508a25fbe2fb')
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
