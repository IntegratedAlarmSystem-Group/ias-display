import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

/**
* Service used to centralize all the navigation thorugh URLs
*/
@Injectable()
export class RoutingService {

  /**
  * Instantiates the service
  * @param {Router} router instance of an Angular {@link Router} to handle routing
  * @param {NgZone} ngZone Service used for executing work inside or outside of the Angular Zone
  */
  constructor(private router: Router, private ngZone: NgZone) { }

  /**
  * Go to the TableComponent and pass a filter value by the URL
  * @param {string} filter filter values to pass to the TableComponent through the URL
  */
  tableWithFilter(filter: string) {
    this.ngZone.run(
      () => {
        filter.replace(' ', '_'); // TODO: This is wrong, fix it
        this.router.navigate(['/tabular/' + filter]);
      }
    );
  }

  /**
  * Go to the Antennas View
  */
  goToAntennas() {
    this.ngZone.run(
      () => {
        this.router.navigate(['antennas']);
      }
    );
  }

  /**
  * Go to the Weather View
  */
  goToWeather() {
    this.ngZone.run(
      () => {
        this.router.navigate(['weather']);
      }
    );
  }

  /**
  * Go to Acknowledge View in the action outlet
  * @param {string} alarm_id Id of the alarm to Acknowledge
  */
  goToAcknowledge(alarm_id: string) {
    this.ngZone.run(
      () => {
        this.router.navigate([{outlets: {actions: ['acknowledge', alarm_id]}}]);
      }
    );
  }

  /**
  * Go to Shelve View in the action outlet
  * @param {string} alarm_id Id of the alarm to Shleve/Unshelve
  */
  goToShelve(alarm_id: string) {
    this.ngZone.run(
      () => {
        this.router.navigate([{outlets: {actions: ['shelve', alarm_id]}}]);
      }
    );
  }

  /**
  * Clean action outlet
  */
  cleanActionOutlet() {
    this.ngZone.run(
      () => {
        this.router.navigate([{outlets: {actions: null}}]);
      }
    );
  }

  /**
  * Go to login and clean action outlet
  */
  goToLogin() {
    this.ngZone.run(
      () => {
        this.router.navigate([{outlets: {primary: 'login', actions: null}}]);
      }
    );
  }

}
