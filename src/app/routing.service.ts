import { Injectable } from '@angular/core';
import { Router} from '@angular/router';

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

}
