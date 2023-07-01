import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../model/config';
import {ConfigService} from './config.service';
import {environment} from "../../environments/environment";

@Injectable()

export class FixturesService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getFixtures(teamId: number): Observable<any> {
    return this.http.get<Config[]>(environment.sportmonks.url + '/teams/' + teamId + '?include=upcoming&api_token=' + environment.sportmonks.apiKey + '' );
  }

  getResults(teamId: number, seasonId: number): Observable<any> {
    return this.http.get<Config[]>(environment.sportmonks.url + '/teams/' + teamId + '?include=latest&seasons=19727&api_token=' + environment.sportmonks.apiKey + '');
  }

  getMatchReport(matchId: number) {
    return this.http.get<Config[]>(environment.sportmonks.url + '/fixtures/' + matchId + '?include=lineup,localTeam,visitorTeam,substitutions,goals&api_token=' + environment.sportmonks.apiKey + '' );
  }

}
