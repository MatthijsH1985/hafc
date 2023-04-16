import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { environment } from '../../../environments/environment';

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
  private readonly USERNAME = 'USERNAME';
  private readonly USER_EMAIL = 'USER_EMAIL'

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}` + `${this.loginUrl}`, { username: email, password: password })
      .pipe(
        tap(response => {
          const token = response.token;
          const username = response.user_nicename;
          const user_email = response.user_email;
          this.storeToken(token);
          this.storeUsername(username);
          this.storeUserEmail(user_email);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logOut(): void {
    this.removeToken();
    this.removeUsername();
    this.removeUserEmail();
  }

  getUserName(): string | null {
    return localStorage.getItem(this.USERNAME);
  }

  getUserEmail() {
    return localStorage.getItem(this.USER_EMAIL);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private storeUsername(username: string): void {
    localStorage.setItem(this.USERNAME, username);
  }

  private storeUserEmail(userEmail: string): void {
    localStorage.setItem(this.USER_EMAIL, userEmail);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private removeToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  private removeUsername(): void {
    localStorage.removeItem(this.USERNAME);
  }

  private removeUserEmail(): void {
    localStorage.removeItem(this.USER_EMAIL);
  }
}
