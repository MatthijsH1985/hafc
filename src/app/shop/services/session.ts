import {isEmpty} from 'rxjs';
import {Injectable} from '@angular/core';
import _ from 'lodash';

@Injectable()

// @ts-ignore
export class SessionService {

  constructor() {
  }

  checkIfSessionExists(key: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const item = localStorage.getItem(key);
      resolve(!!item);
    });
  }

  setSession(session: any) {
    if (_.isEmpty(session)) {
      return null;
    }
    return localStorage.setItem('x-wc-session', session);
  }

  getCartSession = () => {
    return localStorage.getItem( 'x-wc-session' );
  }

}
