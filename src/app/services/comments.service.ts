import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../model/config';
import {ConfigService} from './config.service';

@Injectable()

export class CommentsService {
  // @ts-ignore


  // @ts-ignore
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  };
  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  getComments(post:any, page = 1, order = 'desc'): Observable<Config[]> {
    return this.http.get<Config[]>(this.configService.config.apiEndpoint + '/comments?post='+ post + '&per_page=100&page='+ page + '&order='+ order + '', this.httpOptions);
  }

  getCommentsByUserId(userId: number, token: string):Observable<any> {
    // @ts-ignore
    const user: any = JSON.parse(localStorage.getItem('token'));
    const httpOptionsBearer = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(this.configService.config.apiEndpoint + '/comments', httpOptionsBearer);
  }

  postComment(comment: any, token: string): Observable<Config[]> {
    const httpOptionsBearer = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<Config[]>(this.configService.config.apiEndpoint + '/comments', comment, httpOptionsBearer);
  }
}
