import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Config} from "../../model/config";
import {environment} from "../../../environments/environment";

@Injectable()

export class CommentsService {

  private lastFetchTime: number = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  };

  constructor(private http: HttpClient) {
  }

  private newCommentAddedSubject: Subject<any> = new Subject<any>();

  private commentModalSubject = new BehaviorSubject<boolean>(false);
  private commentIdSubject = new BehaviorSubject<number>(0);
  public commentId$ = this.commentIdSubject.asObservable();
  public replyVisible$ = this.commentModalSubject.asObservable()

  sendCommentId(commentId: number) {
    this.commentIdSubject.next(commentId);
  }

  setReplyToCommentModalVisibility(visibiliy = false) {
    this.commentModalSubject.next(visibiliy)
  }

  get newCommentAdded$(): Observable<any> {
    return this.newCommentAddedSubject.asObservable();
  }

  addNewComment(comment: any) {
    this.newCommentAddedSubject.next(comment);
  }

  postComment(comment: any): Observable<Config[]> {
    return this.http.post<Config[]>(environment.apiUrl + '/comments', comment, this.httpOptions);
  }

  rateComment(commentData: any): Observable<Config[]> {
    // if (this.authService.isAuthenticated()) {
    //   // commentData.author_id = thi;
    //  // return this.http.post<Config[]>(environment.apiUrl + '/mumba/comment-like/', commentData, this.httpOptionsLoggedIn);
    // }
    return this.http.post<Config[]>(environment.apiUrl + '/mumba/comment-like/', commentData, this.httpOptions);
  }

  getPopularComments(postId: number) {
    const url = `${environment.apiUrl}/comments/popular-comments?post_id=${postId}`;
    return this.http.get<Config[]>(url, this.httpOptions);
  }

  getLatestComments(post: any = undefined) {
    const randomQueryParam = `cache_bypass=1`;
    const perPageParam = `per_page=5`
    let queryParam: string = randomQueryParam;
    let perPage:string = perPageParam
    if (post) {
      perPage = `per_page=8`
      queryParam = `post=${post}&${randomQueryParam}&${perPage}`;
    }
    return this.http.get<Config[]>(environment.apiUrl + '/comments?&' + queryParam + '&' + perPage + '', this.httpOptions);
  }

  getComments(post:any, page = 1, order = 'desc'): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/comments?post='+ post + '&per_page=40&page='+ page + '&order='+ order + '', this.httpOptions);
  }

  getCommentsCount(post:any): Observable<Config[]> {
    const randomQueryParam = `cache_bypass=${Math.random()}`;
    return this.http.get<Config[]>(environment.apiUrl + '/mumba/comment_count/'+ post +'?'+ randomQueryParam + '');
  }

}
