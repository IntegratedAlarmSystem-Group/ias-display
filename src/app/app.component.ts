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

  @ViewChild('sidenav') public sidenav: MatSidenav;

  /**
  * Title of the application
  */
  title = 'Integrated Alarm System';

  /**
  * State of the main sidenav
  */
  isCompacted = true;

  /** Sidebar Menu of the application */
  sidenavItems = [
    // { title: 'Overview', link: '/overview', sidelink: null, icon: 'language'},
    // { title: 'Table', link: '/tabular', sidelink: null, icon: 'list'}
    { title: 'Overview', link: '/overview', icon: 'language'},
    { title: 'Overview', link: "[{outlets: {primary: 'tabular', sidebar: null}}]", icon: 'language'},
    { title: 'Table', link: '/tabular', icon: 'list'}
  ];

  /**
   * Instantiates the service
   * @param {AlarmService} alarmService Service used to get the Alarms of this component
   */
  constructor(
    private alarmService: AlarmService,
    public sidenavService: SidenavService
  ) {}

  /**
   * Instantiates the {@link AlarmService}
   */
  ngOnInit() {
    this.alarmService.initialize();
    this.sidenavService.setSidenav(this.sidenav);
  }

  /**
   * Toggles expanding-contracting the sidebar
   * @returns {boolean} Value of the main sidenav isCompacted variable
   */
  toggleSidenav(): boolean {
    this.isCompacted = !this.isCompacted;
    return this.isCompacted;
  }
}
