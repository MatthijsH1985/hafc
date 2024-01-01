import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from "../../core/services/config.service";
import {AuthService} from "../../services/auth/auth-service";
import {Config} from "../../model/config";
import {environment} from "../../../environments/environment";

@Injectable()

export class CommentsService {

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
              private authService: AuthService) {
  }

  private newCommentAddedSubject: Subject<any> = new Subject<any>();

  private commentModalSubject = new BehaviorSubject<boolean>(false);
  private commentIdSubject = new BehaviorSubject<number>(0);
  public commentId$ = this.commentIdSubject.asObservable();
  public modalVisible$ = this.commentModalSubject.asObservable()

  sendCommentId(commentId: number) {
    this.commentIdSubject.next(commentId);
  }

  setCommentModalVisibility(visibiliy = false) {
    this.commentModalSubject.next(visibiliy)
  }

  get newCommentAdded$(): Observable<any> {
    return this.newCommentAddedSubject.asObservable();
  }

  addNewComment(comment: any) {
    this.newCommentAddedSubject.next(comment);
  }

  postComment(comment: any): Observable<Config[]> {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();

      const httpOptionsLoggedIn = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.post<Config[]>(environment.apiUrl + '/comments', comment, httpOptionsLoggedIn);
    }
    return this.http.post<Config[]>(environment.apiUrl + '/comments', comment, this.httpOptions);
  }

  rateComment(commentData: any): Observable<Config[]> {
    this.authService.isAuthenticated()
    if (this.authService.isAuthenticated()) {
      return this.http.post<Config[]>(environment.apiUrl + '/mumba/comment-like/', commentData, this.httpOptionsLoggedIn);
    }
    return of([]);
  }

  reportComment(commentData: any) {
    if (this.authService.isAuthenticated()) {
      return this.http.post<Config[]>(environment.apiUrl + '/mumba/report-comment', commentData, this.httpOptions);
    }
    return of([]);
  }

  getLatestComments() {
    const randomQueryParam = `cache_bypass=1`;
    return this.http.get<Config[]>(environment.apiUrl + '/comments?per_page=4&' + randomQueryParam + '', this.httpOptions);
  }

  getLatestCommentsByUser(authorId: number) {
    const randomQueryParam = `cache_bypass=1`;
    return this.http.get<Config[]>(environment.apiUrl + '/comments?per_page=10&order=desc&' + randomQueryParam + '&author=' + authorId , this.httpOptionsLoggedIn);
  }

  getComments(post:any, page = 1, order = 'desc'): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/comments?post='+ post + '&per_page=100&page='+ page + '&order='+ order + '', this.httpOptions);
  }

  getCommentsCount(post:any): Observable<Config[]> {
    const randomQueryParam = `cache_bypass=${Math.random()}`;
    return this.http.get<Config[]>(environment.apiUrl + '/mumba/comment_count/'+ post +'?'+ randomQueryParam + '');
  }

}
