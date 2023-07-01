import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../model/config';
import {ConfigService} from './config.service';
import {environment} from "../../environments/environment";

@Injectable()

export class StandingsService{
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getStandings(seasonId: any): Observable<any> {
    return this.http.get<Config[]>(environment.sportmonks.url + '/standings/season/21730?include=team&api_token=' + environment.sportmonks.apiKey+ '', this.httpOptions );
  }
}
