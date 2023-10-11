import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../model/config';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth/auth-service";
import {ConfigService} from "../core/services/config.service";

@Injectable()

export class UserService {

  // @ts-ignore
  private apiUrl = environment.apiUrl;
  private userServiceUrl = environment.userServiceUrl;
  // @ts-ignore
  token: any = this.authService.getToken();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  };
  constructor(private http: HttpClient, private configService: ConfigService, private authService: AuthService) {
  }

  createUser(user: any): Observable<Config[]> {
    return this.http.post<Config[]>(`${this.userServiceUrl}/`  + 'userservice/create/', user, this.httpOptions);
  }

  validateKey(key: any) {
    return this.http.get<Config[]>(`${this.userServiceUrl}/userservice/verify-account/${key}`, this.httpOptions);
  }

  forgetPassWord(userEmail: any) {
    return this.http.post<Config[]>(`${this.userServiceUrl}` + '/bdpwr/v1/reset-password/', userEmail, this.httpOptions);
  }

  setUserPassword(payload: any) {
    return this.http.post<Config[]>(`${this.userServiceUrl}` + '/bdpwr/v1/set-password/', payload, this.httpOptions);
  }

  validateCode(payload: any) {
    return this.http.post<Config[]>(`${this.userServiceUrl}` + '/bdpwr/v1/validate-code/', payload, this.httpOptions);
  }

  updateUser(user: number | undefined, userData: any): Observable<Config[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.post<Config[]>(`${environment.apiUrl}`  + '/users/'+ `${user}` + '?context=edit/', userData, httpOptions);
  }
}
