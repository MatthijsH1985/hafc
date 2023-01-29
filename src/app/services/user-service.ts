import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs';
import {Config} from '../model/config';

@Injectable({
  providedIn: 'any'
})

export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient, private configService: ConfigService) {
  }

  createUser(user: any): Observable<Config[]> {
    return this.http.post<Config[]>(this.configService.config.apiEndPointDev + '/app/v1/createuser', user, this.httpOptions);
  }

  loginUser(user: any): Observable<Config[]> {
    return this.http.post<Config[]>(this.configService.config.apiEndpoint + '/jwt-auth/v1/token', user, this.httpOptions);
  }

  getUserInfo(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer ' + token
      })
    };
    return this.http.post<Config[]>(this.configService.config.apiEndpoint + '/jwt-auth/v1/token/validate', httpOptions);
  }

}
