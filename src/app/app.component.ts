import { Component, OnInit } from '@angular/core';
import { AlarmService } from './alarm.service';

/**
* Main component of the application
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
    { title: 'Overview', link: '/overview', icon: 'language'},
    { title: 'Table', link: '/tabular', icon: 'list'}
  ];

  /**
   * Instantiates the service
   * @param {AlarmService} alarmService Service used to get the Alarms of this component
   */
  constructor(
    private alarmService: AlarmService
  ) {}

  /**
   * Instantiates the {@link AlarmService}
   */
  ngOnInit() {
    this.alarmService.initialize();
  }

  /**
   * Toggles expanding-contracting the sidebar
   * @returns {boolean} Value of the main sidenav isCompacted variable
   */
  toggleSidenav(): boolean {
    this.isCompacted=!this.isCompacted
    return this.isCompacted;
  }
}
