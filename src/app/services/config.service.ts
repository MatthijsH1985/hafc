import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../model/config';

@Injectable()
export class ConfigService {
  config: Config = {
    "apiEndpoint": "https://www.hafc.nl/wp-json/wp/v2",
    "authEndPoint": "https://www.hafc.nl/wp-json/jwt-auth/v1",
    "apiEndPointDev": "http://hafc.site.development:8080/wp-json",
    "sportmonks": {
      "apiEndpointSportmonks": "https://soccer.sportmonks.com/api/v2.0",
      "token": "gFPh2F6EuJvjzcKIuj0keZfp0vhlUVRWPR0H0qmg0Dt1vYNYlVUvr4oYGQD8"
    }
  };

  constructor(private readonly http: HttpClient) {
  }

}
