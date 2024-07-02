import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Config} from '../model/config';
import {environment} from "../../environments/environment";
import {ConfigService} from "../core/services/config.service";

@Injectable()

export class DonateService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })
  };

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  addDonation(user: any): Observable<Config[]> {
    return this.http.post<Config[]>(`${environment.backendEndpoint}` + '/donate', user, this.httpOptions);
  }
}
