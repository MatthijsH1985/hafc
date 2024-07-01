import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../model/config';
import {environment} from "../../environments/environment";
import {ConfigService} from "../core/services/config.service";

@Injectable()

export class TeamService{

  season = 19727;

  httpOptions = {
    headers: new HttpHeaders({})
  };
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getTeamInfo(teamId: any): Observable<any> {
    return this.http.get<Config[]>(environment.customApi + '/teams/' + teamId + '?include=stats,venue,squad&seasons=' + this.season + '&api_token=' + environment.customApi + '', this.httpOptions );
  }
}
