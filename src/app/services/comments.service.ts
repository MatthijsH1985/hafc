import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../model/config';
import {ConfigService} from './config.service';
import {AuthService} from "./auth/auth-service";
import {environment} from "../../environments/environment";

@Injectable()

export class CommentsService {

  // @ts-ignore
  token: any = this.authService.getToken();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  };
  httpOptionsLoggedIn = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${this.token}`
    })
  };
  constructor(private http: HttpClient,
              private configService: ConfigService,
              private authService: AuthService) {
  }

  getComments(post:any, page = 1, order = 'desc'): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/comments?post='+ post + '&per_page=60&page='+ page + '&order='+ order + '', this.httpOptions);
  }

  getCommentsByUserId(userId: number | undefined):Observable<any> {
    const token: any = this.authService.getToken();
    const httpOptionsBearer = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(environment.apiUrl + '/comments?author=' + userId + '', httpOptionsBearer);
  }

  postComment(comment: any): Observable<Config[]> {
    if (this.authService.isAuthenticated()) {
      return this.http.post<Config[]>(environment.apiUrl + '/comments?author=' + this.authService.getUserID() + '', comment, this.httpOptionsLoggedIn);
    }
    return this.http.post<Config[]>(environment.apiUrl + '/comments', comment, this.httpOptions);
  }
}
