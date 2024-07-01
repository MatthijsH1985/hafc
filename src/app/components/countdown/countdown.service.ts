import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Config} from '../../model/config';
import {environment} from '../../../environments/environment';

@Injectable()

export class CountdownService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  };
  constructor(private http: HttpClient) {

  }
  getCountdown(page: number) {
    return this.http.get<Config[]>(environment.apiUrl + '/pages/' + page + '', this.httpOptions);
  }
}
