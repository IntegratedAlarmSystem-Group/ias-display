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

  menu: NbMenuItem[] = [
    { title: 'Overview', link: '/overview', icon:'ion-ios-globe-outline'},
    { title: 'Alarms', link: '/alarms', icon:'ion-ios-list'},
    { title: 'Table', link: '/tabular', icon:'ion-ios-list'},
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private alarmService: AlarmService
  ){};

  ngOnInit(){
    this.alarmService.initialize();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }


}
