import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../model/config';

@Injectable()
export class ConfigService {
  config: Config = {
    "apiEndpoint": "https://www.hafc.nl/api",
    "authEndPoint": "https://backend.nl/wp-json/jwt-auth/v1",
    "apiEndPointDev": "http://hafc.site.development:8080/wp-json"
  };

  constructor() {
  }

}
