import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from '../model/config';
import {environment} from "../../environments/environment";

@Injectable()

export class StandingsService{
  constructor(private http: HttpClient) {}

  getStandings(seasonId: any): Observable<any> {
    return this.http.get<Config[]>(environment.customApi + '/standings/seasons/21730' );
  }
}
