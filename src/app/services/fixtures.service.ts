import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../model/config';
import {ConfigService} from './config.service';
import {environment} from "../../environments/environment";

@Injectable()

export class FixturesService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams().set('include', 'latest')
  }

  getFixtures(teamId: number): Observable<any> {
    return this.http.get<Config[]>(environment.customApi + '/schedules/teams/' + teamId + '' );
  }

  getResults(teamId: number, seasonId: number): Observable<any> {
    return this.http.get<Config[]>(environment.customApi + '/teams/' + teamId + '', this.httpOptions);
  }

  getMatchReport(matchId: number) {
    return this.http.get<Config[]>(environment.customApi + '/fixtures/' + matchId + '?include=lineup,localTeam,visitorTeam,substitutions,goals' );
  }

}
