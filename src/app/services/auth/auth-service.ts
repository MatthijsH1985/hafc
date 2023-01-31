import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from '../config.service';
import {Observable} from 'rxjs';
import {Config} from '../../model/config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient, private configService: ConfigService) {
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  createUser(user: any): Observable<Config[]> {
    return this.http.post<Config[]>(this.configService.config.authEndPoint + '/createuser', user, this.httpOptions);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<Config[]>(this.configService.config.authEndPoint + '/token', user, this.httpOptions);
  }

  validateToken(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer ' + token
      })
    };
    return this.http.post<Config[]>(this.configService.config.authEndPoint + '/token/validate', token, httpOptions);
  }

}
