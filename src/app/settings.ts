/** Set of URLs used to request data from the Backend */
export const BackendUrls = {
  TOKEN: '/get-token/',
  CDB: '/cdb-api/',
  CDB_IAS: '/cdb-api/ias/',
  CDB_IASIO: '/cdb-api/iasio/',
  TICKETS: '/tickets/',
  TICKETS_MULTIPLE_ACK: '/tickets-api/tickets/acknowledge/',
  TICKETS_INFO: '/tickets-api/tickets/old_open_info/',
  SHELVE_API: '/tickets-api/shelve-registries/',
  UNSHELVE_API: '/tickets-api/shelve-registries/unshelve/',
};

/** Set of websocket streams from where the applications to receives data from the Backend */
export const Streams = {
  ALARMS: 'alarms',
  UPDATES: 'requests',
};

/** Set of items to store in the browser cache */
export const StorageItems = {
  TOKEN: 'token',
};

/** Set of properties to set the formatting of dates */
export const Locale = {
  DATE_FORMAT: 'yyyy-MM-ddTHH:mm:ss',
  TIMEZONE: '+0000',
};

/** Set that defines the locations of assets in the applicaiton */
export const Assets = {
  ICONS: '/assets/img/',
};
