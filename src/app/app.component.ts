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

  /** Sidebar Menu of the application */
  menu: NbMenuItem[] = [
    { title: 'Overview', link: '/overview', icon: 'ion-ios-globe-outline'},
    { title: 'Table', link: '/tabular', icon: 'ion-ios-list'},
    // { title: 'Alarms', link: '/alarms', icon:'ion-ios-list'},
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
   * @returns {boolean} false
   */
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
}
