import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../model/config';
import {ConfigService} from './config.service';

@Injectable()

export class AdsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAds(category = 804): Observable<Config[]> {
    return this.http.get<Config[]>(this.configService.config.apiEndpoint + '/posts?categories=' + category + '', this.httpOptions);
  }

  getLinks(category = 809): Observable<Config[]> {
    return this.http.get<Config[]>(this.configService.config.apiEndpoint + '/posts?categories=' + category + '', this.httpOptions);
  }

}