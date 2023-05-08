import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { environment } from '../../../environments/environment';
import {JwtHelperService} from "@auth0/angular-jwt";
import {localStorage} from "localstorage-memory";

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

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, @Inject('isBrowser') private isBrowser: boolean) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}` + `${this.loginUrl}`, { username: email, password: password })
      .pipe(
        tap(response => {
          if (this.isBrowser) {
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
    return this.http.get<any>(`${this.apiUrl}` + 'wp/v2/users/me?context=edit', this.httpOptions).pipe(
      tap( user => {
        return user;
      })
    )
  }

  public isAuthenticated(): any {
    if (this.isBrowser && localStorage !== undefined) {
      const token = localStorage.getItem(this.JWT_TOKEN);
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  logOut(): void {
    this.removeToken();
    this.removeUsername();
    this.removeUserEmail();
  }

  getUserID(): any | null {
    if (this.isBrowser && localStorage !== undefined) {
      return localStorage.getItem(this.USER_ID)
    }
  }

  getUserName(): any | null {
    if (this.isBrowser && localStorage !== undefined) {
      return localStorage.getItem(this.USERNAME);
    }
  }

  getUserEmail(): any {
    if (this.isBrowser && localStorage !== undefined) {
      return localStorage.getItem(this.USER_EMAIL);
    }
  }

  private storeToken(token: string): void {
    if (this.isBrowser && localStorage !== undefined) {
      localStorage.setItem(this.JWT_TOKEN, token);
    }
  }

  private storeUserID(user_id: string): void {
    if (this.isBrowser && localStorage !== undefined) {
      localStorage.setItem(this.USER_ID, user_id);
    }
  }

  private storeUsername(username: string): void {
    if (this.isBrowser && localStorage !== undefined) {
      localStorage.setItem(this.USERNAME, username);
    }
  }

  private storeUserEmail(userEmail: string): void {
    if (this.isBrowser && localStorage !== undefined) {
      localStorage.setItem(this.USER_EMAIL, userEmail);
    }
  }

  public getToken(): any | null {
    if (this.isBrowser && localStorage !== undefined) {
      return localStorage.getItem(this.JWT_TOKEN);
    }
  }

  private removeToken(): void {
    if (this.isBrowser && localStorage !== undefined) {
      localStorage.removeItem(this.JWT_TOKEN);
    }
  }

  private removeUsername(): void {
    if (this.isBrowser && localStorage !== undefined) {
      localStorage.removeItem(this.USERNAME);
    }
  }

  private removeUserEmail(): void {
    if (this.isBrowser && localStorage !== undefined) {
      localStorage.removeItem(this.USER_EMAIL);
    }
  }
}
