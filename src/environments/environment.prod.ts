export const environment = {
  production: false,
  apiUrl: 'https://backend.hafc.nl/wp-json/wp/v2',
  loginUrl: 'https://backend.hafc.nl/wp-json/jwt-auth/v1/token',
  userServiceUrl: 'https://backend.hafc.nl/wp-json/userservice',
  recaptcha: {
    siteKey: '6LdyyrcUAAAAAB81RMMORr90yBEMcYN_omdANSEe',
  },
  sportmonks: {
    url: "https://soccer.sportmonks.com/api/v2.0",
    apiKey: "gFPh2F6EuJvjzcKIuj0keZfp0vhlUVRWPR0H0qmg0Dt1vYNYlVUvr4oYGQD8"
  },
  // customApi: 'https://hafc.vercel.app/api'
  customApi: 'https://stats.hafc.nl/v3/football'
};
