import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { NbMenuService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';
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
   * @param {NbSidebarService} sidebarService Service used for the sidebar
   * @param {NbMenuService} menuService Service used for the menu of the sidebar
   * @param {AlarmService} alarmService Service used to get the Alarms of this component
   */
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
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
   * @returns {boolean} Main sidenav compacted state
   */
  toggleSidenav(): boolean {
    this.isCompacted=!this.isCompacted
    return this.isCompacted;
  }
}
