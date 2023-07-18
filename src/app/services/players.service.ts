import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Config} from '../model/config';
import {ConfigService} from './config.service';
import {environment} from "../../environments/environment";

@Injectable()

export class PlayersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    }),
    params: new HttpParams().set('include', 'stats,seasons')
  };

  constructor(private http: HttpClient,
              private configService: ConfigService) {
  }

  getPlayers(): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/pages?parent=23380&per_page=50');
  }

  getPlayer(playerId: number): Observable<Config[]> {
    return this.http.get<Config[]>(environment.apiUrl + '/pages/' + playerId + '', this.httpOptions);
  }

  getPlayerStats(playerId: number): Observable<any> {
    return this.http.get<Config[]>(environment.customApi + '/players/' + playerId + '', this.httpOptions);
  }

}
