// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  key: 'ck_658450e189f6295559481678772f4a9a22e9f164:cs_9ffe9bd52cfc4de9766951e3ca57886856ac1460',
  siteUrl: 'https://hafc_site.test:4208',
  apiUrl: 'https://hafc_site.test/wp-json/wp/v2',
  backendEndpoint: 'https://hafc_site.test:4208',
  shopUrl: 'https://hafc_site.test/wp-json/wc/v3',
  shopUrlCustom: 'https://hafc_site.test/wp-json/cocart/v2',
  loginUrl: 'https://hafc_site.test/wp-json/jwt-auth/v1/token',
  userServiceUrl: 'https://hafc_site.test/wp-json/userservice',
  recaptcha: {
    siteKey: '6LdyyrcUAAAAAB81RMMORr90yBEMcYN_omdANSEe',
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
