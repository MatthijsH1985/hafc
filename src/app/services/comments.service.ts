import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../model/config';
import {ConfigService} from './config.service';

@Injectable()

export class CommentsService {
  storageReady = new BehaviorSubject(false);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  };
  constructor(private http: HttpClient,
              private configService: ConfigService) {
    this.init();
  }

  init() {
    this.storageReady.next(true);
  };

  getComments(post:any, page = 1, order = 'desc'): Observable<Config[]> {
    return this.http.get<Config[]>(this.configService.config.apiEndpoint + '/comments?post='+ post + '&per_page=100&page='+ page + '&order='+ order + '', this.httpOptions);
  }

  postComment(comment: any): Observable<Config[]> {
    return this.http.post<Config[]>(this.configService.config.apiEndpoint + '/comments', comment, this.httpOptions);
  }

}
