import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from '../config.service';
import {Observable, from, of, BehaviorSubject} from 'rxjs';
import {Config} from '../../model/config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // @ts-ignore
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  // @ts-ignore
  $loggedIn: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient, private configService: ConfigService) {
    this.$loggedIn = new BehaviorSubject<boolean>(false);
  }

  getUser(): any {
    return localStorage.getItem('user');
  }

  getToken(): any {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser(user: string) {
    localStorage.setItem('user', user);
  }

  createUser(user: any): Observable<Config[]> {
    return this.http.post<Config[]>(this.configService.config.authEndPoint + '/createuser', user, this.httpOptions);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<Config[]>(this.configService.config.authEndPoint + '/token', user, this.httpOptions);
  }

  getAccountDetails(): Observable<any> {
    return this.http.get(this.configService.config.apiEndpoint + '/users/me', this.httpOptions);
  }

  validateToken(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer ' + token
      })
    };
    return this.http.post<Config[]>(this.configService.config.authEndPoint + '/token/validate', token, httpOptions);
  }

  // @ts-ignore
  getLoggedInUser(): any {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.setLoginStatus(false);
  }

  // @ts-ignore
  isAuthenticated(): boolean {
    if (this.getLoggedInUser()) {
      this.$loggedIn.next(true);
    } else {
      this.$loggedIn.next(false);
    }
  }

  getLoginStatus(): Observable<boolean> {
    return this.$loggedIn.asObservable();
  }
  setLoginStatus(loggedIn: boolean): void {
    this.$loggedIn.next(loggedIn);
  }
}
