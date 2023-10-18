// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://backend.hafc.nl/wp-json/wp/v2',
  shopUrl: 'https://backend.hafc.nl/wp-json/wc/v3',
  shopUrlCustom: 'https://backend.hafc.nl/wp-json/rae/v1',
  loginUrl: 'https://backend.hafc.nl/wp-json/jwt-auth/v1/token',
  userServiceUrl: 'https://backend.hafc.nl/wp-json',
  recaptcha: {
    siteKey: '6LfEKGImAAAAACNlgj6_ompIBaRy_e4sulh4Axgu',
  },
  customApi: 'https://stats.hafc.nl/v3/football'
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
