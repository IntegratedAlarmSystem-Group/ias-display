/** Set of URLs used to request data from the Backend */
export const BackendUrls = {
  TOKEN: '/get-token/',
  CDB: '/cdb-api/',
  CDB_IAS: '/cdb-api/ias/',
  TICKETS: '/tickets/',
  TICKETS_MULTIPLE_ACK: '/tickets-api/tickets/acknowledge/',
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
