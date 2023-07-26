import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from "../../services/config.service";
import {AuthService} from "../../services/auth/auth-service";
import {Config} from "../../model/config";
import {environment} from "../../../environments/environment";

@Injectable()

export class CommentsService {

  // @ts-ignore
  token: any = this.authService.getToken();
  private lastFetchTime: number = 0;

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

  private newCommentAddedSubject: Subject<any> = new Subject<any>();

  get newCommentAdded$(): Observable<any> {
    return this.newCommentAddedSubject.asObservable();
  }

  addNewComment(comment: any) {
    this.newCommentAddedSubject.next(comment);
  }

  postComment(comment: any): Observable<Config[]> {
    if (this.authService.isAuthenticated()) {
      return this.http.post<Config[]>(environment.apiUrl + '/comments?author=' + this.authService.getUserID(), comment, this.httpOptionsLoggedIn);
    }
    return this.http.post<Config[]>(environment.apiUrl + '/comments', comment, this.httpOptions);
  }

  getComments(post:any, page = 1, order = 'desc'): Observable<Config[]> {
    const randomQueryParam = `cache_bypass=${Math.random()}`;
    return this.http.get<Config[]>(environment.apiUrl + '/comments?post='+ post + '&per_page=60&page='+ page + '&order='+ order + '&' + randomQueryParam + '', this.httpOptions);
  }

  getCommentsCount(post:any): Observable<Config[]> {
    const randomQueryParam = `cache_bypass=${Math.random()}`;
    return this.http.get<Config[]>(environment.apiUrl + '/mumba/comment_count/'+ post +'?'+ randomQueryParam + '');
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

  private getHeaders(): HttpHeaders {
    const currentTime = new Date().getTime();
    const headers = new HttpHeaders().set('X-Last-Fetch-Time', this.lastFetchTime.toString());
    this.lastFetchTime = currentTime;
    return headers;
  }

}
