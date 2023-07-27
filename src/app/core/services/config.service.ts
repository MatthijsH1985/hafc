import { Injectable } from '@angular/core';
import {Config} from "../../model/config";

@Injectable()
export class ConfigService {
  config: Config = {
    "apiEndpoint": "",
    "authEndPoint": "",
    "apiEndPointDev": "",
    "teamID": 1403,
    "seasonID": 21730
  };

  constructor() {
  }

}
