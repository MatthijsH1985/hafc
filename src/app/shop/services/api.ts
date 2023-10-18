import {getSession} from './session';
import _ from 'lodash';

interface ApiCartConfig {
  headers: {
    'X-Headless-CMS': boolean;
    'x-wc-session'?: string; // Hier definiëren we dat 'x-wc-session' een optionele string is
  };
}

export const getApiCartConfig = (): ApiCartConfig => {
  const config: ApiCartConfig = {
    headers: {
      'X-Headless-CMS': true,
    },
  };

  const storedSession = getSession();

  if (!_.isEmpty(storedSession)) {
    // @ts-ignore
    config.headers['x-wc-session'] = storedSession;
  }

  return config;
}
