import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

/**
* Service used to handle the sidenv where the actions panels (Acknowledge and Shelve) are displayed
*/
@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  /**
   * Builds an instance of the service
   */
  constructor() { }

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
  * Toggles the sidenav (open/close)
  */
  public toggle(): void {
    this.sidenav.toggle();
  }
}
