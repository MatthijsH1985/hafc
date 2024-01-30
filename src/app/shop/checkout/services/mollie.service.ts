import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ConfigService} from '../../../core/services/config.service';
import {Config} from '../../../model/config';

@Injectable()

export class  MollieService {

  mollieTestApiKey = 'test_E8azAjRBsrTA96MSR4f7r6SrdEcagz'
  molliePaymentLink = 'https://api.mollie.com/v2/payments';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Basic ' + btoa(this.mollieTestApiKey)
    })
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  // payment(paymentDetails: any):Observable<any> {
  //   return this.http.post<Config>('https://hafc_site.test:4000/api/payment', this.httpOptions);
  // }

}
