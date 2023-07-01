export const environment = {
  production: false,
  apiUrl: 'https://www.hafc.nl/wp-json/',
  loginUrl: 'jwt-auth/v1/token',
  userServiceUrl: 'userservice',
  recaptcha: {
    siteKey: '6LdyyrcUAAAAAB81RMMORr90yBEMcYN_omdANSEe',
  },
  sportmonks: process.env['sportmonks']
};
