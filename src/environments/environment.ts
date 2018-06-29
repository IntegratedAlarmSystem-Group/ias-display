// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/** Environment variables related to the production environment */
export const environment = {

  /** Indicates wether the environment is production or development */
  production: false,

  /** Path for websocket connection */
  websocketPath: 'ws://127.0.0.1:8000/stream/',

  /** Base URL for HTTP requests */
  httpUrl: 'http://127.0.0.1:8000',

  /** URL for HTTP requests to the CDB app */
  cdbApiUrl: 'http://127.0.0.1:8000/cdb-api',
};
