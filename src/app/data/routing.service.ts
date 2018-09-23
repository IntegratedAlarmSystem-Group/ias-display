import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
* Service used to centralize all the navigation thorugh URLs
*/
@Injectable()
export class RoutingService {

  /**
  * Instantiates the service
  * @param {Router} router instance of an Angular {@link Router} to handle routing
  */
  constructor(private router: Router) { }

  /**
  * Go to the TabularViewComponent and pass a filter value by the URL
  * @param {string} filter filter values to pass to the TabularViewComponent through the URL
  */
  tableWithFilter(filter: string) {
    filter.replace(' ', '_'); // TODO: This is wrong, fix it
    this.router.navigate(['/tabular/' + filter]);
  }

  /**
  * Go to the Antennas View
  */
  goToAntennas() {
    this.router.navigate(['antennas']);
  }

  /**
  * Go to the Weather View
  */
  goToWeather() {
    this.router.navigate(['weather']);
  }

  /**
  * Go to Acknowledge View in the action outlet
  */
  goToAcknowledge(alarm_id: string) {
    this.router.navigate([{outlets: {actions: ['acknowledge', alarm_id]}}]);
  }

  /**
  * Go to Shelve View in the action outlet
  */
  goToShelve(alarm_id: string) {
    this.router.navigate([{outlets: {actions: ['shelve', alarm_id]}}]);
  }

  /**
  * Clean action outlet
  */
  cleanActionOutlet() {
    this.router.navigate([{outlets: {actions: null}}]);
  }

}
