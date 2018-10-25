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
  SHELVE_REGS_FILTER: '/tickets-api/shelve-registries/filters/',
  FILES_JSON: '/panels-api/files/get_json/?key=',
  WEATHER_VIEW: '/panels-api/alarms-config/weather_config/',
  ANTENNAS_VIEW: '/panels-api/alarms-config/antennas_config/',
  WEATHER_SUMMARY: '/panels-api/alarms-config/weather_summary_config/',
  ANTENNAS_SUMMARY: '/panels-api/alarms-config/antennas_summary_config/',
  PADS_STATUS: '/panels-api/placemark/pads_by_group/',
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

/**
* Set of properties to set the formatting of dates
*
* The formats related to dates should follow the same standard
*
*/
export const Locale = {
  DATE_FORMAT: 'yyyy-MM-ddTHH:mm:ss',  // date format for templates
  MOMENT_DATE_FORMAT: 'YYYY-MM-DDTHH:mm:ss',
  TIMEZONE: '+0000',
};

/** Set that defines the locations of assets in the application */
export const Assets = {
  ICONS: '/assets/img/',
  SOUNDS: '/assets/sounds/'
};

/** Url settings to get data for the related displays */

/** Key for the url to get information for the weather display */
export const WeatherSettings = {
  mapKey: 'weather',
};

/** Key for the url to get information for the antenna display */
export const AntennasSettings = {
  mapKey: 'weather',
};
