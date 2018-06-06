/** Environment variables related to the production environment */
export const environment = {

  /** Indicates wether the environment is production or development */
  production: true,

  /** Path for websocket connection */
  websocketPath: '/stream',

  /** Base URL for HTTP requests */
  httpUrl: '',

  /** URL for HTTP requests to the CDB app */
  cdbApiUrl: '/cdb-api',

  /** URL for wiki documentation */
  wikiUrl: 'https://www.alma.cl/',
};
