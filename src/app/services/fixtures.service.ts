import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../model/config';
import {environment} from "../../environments/environment";

@Injectable()

export class FixturesService {
  constructor(private http: HttpClient) {}

  getFixtures(teamId: number): Observable<any> {
    return this.http.get<Config[]>(environment.customApi + '/schedules/seasons/21730/teams/' + teamId + '' );
  }

  getResults(teamId: number, seasonId: number): Observable<any> {
    return this.http.get<Config[]>(environment.customApi + '/teams/' + teamId + '');
  }

  getMatchReport(matchId: number) {
    return this.http.get<Config[]>(environment.customApi + '/fixtures/multi/' + matchId + '' );
  }

}
