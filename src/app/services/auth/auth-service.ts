import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { environment } from '../../../environments/environment';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Platform} from "@angular/cdk/platform";
import {LocalStorage} from "../../core/services/local-storage";

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loginUrl = environment.loginUrl;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_ID = 'USER_ID';
  private readonly USERNAME = 'USERNAME';
  private readonly USER_EMAIL = 'USER_EMAIL'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${this.getToken()}`
    })
  };

  constructor(private http: HttpClient, private storage: LocalStorage, private _platform: Platform, private jwtHelper: JwtHelperService) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}`, { username: email, password: password })
      .pipe(
        tap(response => {
          if (this._platform.isBrowser) {
            const token = response.token;
            const user_id = response.user_id;
            const username = response.user_nicename;
            const user_email = response.user_email;
            this.storeToken(token);
            this.storeUserID(user_id);
            this.storeUsername(username);
            this.storeUserEmail(user_email);
          }
        })
      );
  }

  getUserInfo(): Observable<any>  {
    return this.http.get<any>(`${this.apiUrl}` + '/users/me', this.httpOptions)
  }

  getUserInfoEditable(): Observable<any>  {
    return this.http.get<any>(`${this.apiUrl}` + '/users/me?context=edit', this.httpOptions)
  }

  public isAuthenticated(): any {
    if (this._platform.isBrowser) {
      const token = this.storage.getItem(this.JWT_TOKEN);
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  logOut(): void {
    this.removeToken();
    this.removeUsername();
    this.removeUserEmail();
  }

  getUserID(): any | null {
    if (this._platform.isBrowser) {
      return this.storage.getItem(this.USER_ID)
    }
  }

  getUserName(): any | null {
    if (this._platform.isBrowser) {
      return this.storage.getItem(this.USERNAME);
    }
  }

  getUserEmail(): any {
    if (this._platform.isBrowser) {
      return this.storage.getItem(this.USER_EMAIL);
    }
  }

  private storeToken(token: string): void {
    if (this._platform.isBrowser) {
      this.storage.setItem(this.JWT_TOKEN, token);
    }
  }

  private storeUserID(user_id: string): void {
    if (this._platform.isBrowser) {
      this.storage.setItem(this.USER_ID, user_id);
    }
  }

  private storeUsername(username: string): void {
    if (this._platform.isBrowser) {
      this.storage.setItem(this.USERNAME, username);
    }
  }

  private storeUserEmail(userEmail: string): void {
    if (this._platform.isBrowser) {
      this.storage.setItem(this.USER_EMAIL, userEmail);
    }
  }

  public getToken(): any | null {
    if (this._platform.isBrowser) {
      return this.storage.getItem(this.JWT_TOKEN);
    }
  }

  private removeToken(): void {
    if (this._platform.isBrowser) {
      this.storage.removeItem(this.JWT_TOKEN);
    }
  }

  private removeUsername(): void {
    if (this._platform.isBrowser) {
      this.storage.removeItem(this.USERNAME);
    }
  }

  private removeUserEmail(): void {
    if (this._platform.isBrowser) {
      this.storage.removeItem(this.USER_EMAIL);
    }
  }
}
