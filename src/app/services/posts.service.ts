import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../model/config';
import {ConfigService} from './config.service';

@Injectable()

export class PostsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getPosts(page = 1, category = [3]): Observable<Config[]> {
    // @ts-ignore
    return this.http.get<Config[]>(this.configService.config.apiEndpoint + '/posts?page='+ page + '&per_page=12&categories=' + category + '', this.httpOptions);
  }

  getPost(postId: any | null): Observable<Config[]> {
    // @ts-ignore
    return this.http.get<Config[]>(this.configService.config.apiEndpoint + '/posts/'+ postId + '', this.httpOptions);
  }

}
