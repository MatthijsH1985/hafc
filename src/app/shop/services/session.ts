import {isEmpty} from 'rxjs';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import _ from 'lodash';
import {isPlatformBrowser} from '@angular/common';

@Injectable()

// @ts-ignore
export class SessionService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
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
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem( 'x-wc-session' );
    }
    return null
  }

}
