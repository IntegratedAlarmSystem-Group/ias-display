import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AlarmService } from './data/alarm.service';
import { SidenavService } from './actions/sidenav.service';

/**
* Main component of the application
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /*
  * Reference to the Actions sidenav (right sidenav)
  */
  @ViewChild('actionsSidenav') public actionsSidenav: MatSidenav;

  /**
  * Title of the application
  */
  title = 'Integrated Alarm System';

  /**
  * State of the main sidenav
  */
  isNavigationCompacted = true;

  /** Navigation Sidenav Menu of the application (left sidenav) */
  navigationSidenavItems = [
    { title: 'Overview', link: 'overview', icon: 'language'},
    { title: 'Table', link: 'tabular', icon: 'list'}
  ];

  /**
   * Instantiates the service
   * @param {AlarmService} alarmService Service used to get the Alarms of this component
   */
  constructor(
    private alarmService: AlarmService,
    public actionsSidenavService: SidenavService
  ) {}

  /**
   * Instantiates the {@link AlarmService}
   */
  ngOnInit() {
    this.alarmService.initialize();
    this.actionsSidenavService.setSidenav(this.actionsSidenav);
  }

  getActionsLink(item: any) {
    if (this.actionsSidenavService.canClose) {
      return {outlets: { primary: item.link, actions: null }};
    } else {
      return {outlets: { primary: item.link }};
    }
  }

  /**
   * Toggles expanding-contracting the sidebar
   * @returns {boolean} Value of the main sidenav isNavigationCompacted variable
   */
  toggleSidenav(): boolean {
    this.isNavigationCompacted = !this.isNavigationCompacted;
    return this.isNavigationCompacted;
  }
}
