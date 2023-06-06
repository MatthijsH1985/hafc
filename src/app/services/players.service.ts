import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../model/config';
import {ConfigService} from './config.service';

@Injectable()

export class PlayersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  };

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  getPlayers(): Observable<Config[]> {
    return this.http.get<Config[]>(this.configService.config.apiEndpoint + '/pages?parent=23380&per_page=50', this.httpOptions);
  }

  getPlayer(playerId: number): Observable<Config[]> {
    return this.http.get<Config[]>(this.configService.config.apiEndpoint + '/pages/' + playerId + '', this.httpOptions);
  }

  getPlayerStats(playerId: number): Observable<any> {
    return this.http.get<Config[]>(this.configService.config.sportmonks.apiEndpointSportmonks + '/players/' + playerId + '?include=stats&seasons=19727&api_token=' + this.configService.config.sportmonks.token + '', this.httpOptions);
  }

}
