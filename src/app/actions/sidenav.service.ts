import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { RoutingService } from '../app-routing/routing.service';

/**
* Service used to handle the sidenv where the actions panels (Acknowledge and Shelve) are displayed
*/
@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  /**
  * Stream of notifications of changes in
  * the status of the service connection
  */
  public shouldReload = new BehaviorSubject<any>(false);

  /**
  * Id of the last {@link Alarm}
  */
  lastAlarmId = '';

  /**
   * Builds an instance of the service
   */
  constructor(
    private routingService: RoutingService
  ) { }

  /** Reference to the sidenav */
  private sidenav: MatSidenav;

  /** Defines wether or not the sidenav can be closed */
  public canClose = true;

  /**
  * Sets the reference to the sidenav
  * @param {MatSidenav} sidenav Reference to the sidenav
  */
  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  /**
  * Opens the sidenav
  */
  public open() {
    return this.sidenav.open();
  }

  /**
  * Closes the sidenav
  */
  public close() {
    return this.sidenav.close();
  }

  /**
  * Closes the sidenav and cleans the actions outlet
  */
  public closeAndClean() {
    this.routingService.cleanActionOutlet();
    return this.close();
  }

  /**
  * Toggles the sidenav (open/close)
  */
  public toggle(): void {
    this.sidenav.toggle();
  }

  /**
  * Go to Acknowledge View in the action outlet
  * @param {string} alarm_id Id of the alarm to Acknowledge
  */
  public goToAcknowledge(alarm_id: string) {
    this.routingService.goToAcknowledge(alarm_id);
  }

  /**
  * Go to Shelve View in the action outlet
  * @param {string} alarm_id Id of the alarm to Shleve/Unshelve
  */
  public goToShelve(alarm_id: string) {
    if (alarm_id === this.lastAlarmId) {
      this.shouldReload.next(true);
    } else {
      this.lastAlarmId = alarm_id;
    }
    this.routingService.goToShelve(alarm_id);
  }
}
