import { Component, OnInit } from '@angular/core';

import { NbSidebarService } from '@nebular/theme';
import { NbMenuService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';

/**
* Main component of the application
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
  * Title of the application
  */
  title = 'IAS Display';

  menu: NbMenuItem[] = [
    { title: 'Overview', link: '/', icon:'ion-ios-globe-outline white', home: true},
    { title: 'Weather AOS', link: '/weather', icon:'ion-ios-sunny-outline white'},
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService
  ){};

  ngOnInit(){
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }


}
