import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Config} from '../model/config';
import {environment} from "../../environments/environment";
import {ConfigService} from "../core/services/config.service";

@Injectable()

export class PlayersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    }),
    // params: new HttpParams().set('include', 'stats,seasons')
  };

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  getPlayers(): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/spelers');
  }

  getPlayer(playerId: number): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/spelers/' + playerId + '', this.httpOptions);
  }

  getPlayerStats(playerId: number): Observable<any> {
    return this.http.get<Config[]>(environment.customApi + '/players/' + playerId + '?include=statistics.details.type&filters=playerstatisticSeasons:' + this.configService.config.seasonID + '', this.httpOptions);
  }

  getPlayerOfTheWeek() {
    return this.http.get<Config[]>(environment.apiUrl + '/player-of-the-week/', this.httpOptions);
  }

}
