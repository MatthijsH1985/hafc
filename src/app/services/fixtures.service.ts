import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../model/config';
import {ConfigService} from './config.service';

@Injectable()

export class FixturesService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getFixtures(teamId: number): Observable<any> {
    return this.http.get<Config[]>(this.configService.config.sportmonks.apiEndpointSportmonks + '/teams/' + teamId + '?include=upcoming&api_token=' + this.configService.config.sportmonks.token + '' );
  }

  getResults(teamId: number, seasonId: number): Observable<any> {
    return this.http.get<Config[]>(this.configService.config.sportmonks.apiEndpointSportmonks + '/teams/' + teamId + '?include=latest&seasons=19727&api_token=' + this.configService.config.sportmonks.token + '');
  }

  getMatchReport(matchId: number) {
    return this.http.get<Config[]>(this.configService.config.sportmonks.apiEndpointSportmonks + '/fixtures/' + matchId + '?include=lineup,localTeam,visitorTeam,substitutions,goals&api_token=' + this.configService.config.sportmonks.token + '' );
  }

}
