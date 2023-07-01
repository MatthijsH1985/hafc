// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://www.hafc.nl/wp-json/',
  loginUrl: 'jwt-auth/v1/token',
  userServiceUrl: 'userservice/',
  recaptcha: {
    siteKey: '6LfEKGImAAAAACNlgj6_ompIBaRy_e4sulh4Axgu',
  },
  sportmonks: 'gFPh2F6EuJvjzcKIuj0keZfp0vhlUVRWPR0H0qmg0Dt1vYNYlVUvr4oYGQD8'
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
