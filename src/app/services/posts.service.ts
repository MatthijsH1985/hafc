import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../model/config';
import {ConfigService} from './config.service';
import {environment} from "../../environments/environment";

@Injectable()

export class PostsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getPosts(page = 1, category = [3]): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/posts?page='+ page + '&per_page=12&categories=' + category + '', this.httpOptions);
  }

  getPostsBySearchTerm(searchTerm: string, page: number = 1) {
    return this.http.get<Config[]>(environment.apiUrl + '/search?search=' + searchTerm + '&context=embed&page=' + page + '&per_page=20', this.httpOptions);
  }

  getPost(postId: any | null): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/posts/'+ postId + '', this.httpOptions);
  }

  getSinglePage(postId: any | null): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/pages/'+ postId + '', this.httpOptions);
  }

}
