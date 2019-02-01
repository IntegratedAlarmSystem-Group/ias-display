import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AlarmService } from './data/alarm.service';
import { SidenavService } from './actions/sidenav.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';
import { UserService } from './data/user.service';
import { Router } from '@angular/router';


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

  // TODO: Use only custom svgIcons
  /** Navigation Sidenav Menu of the application (left sidenav) */
  navigationSidenavItems = [
    {
      title: 'Overview',
      link: 'overview',
      icon: 'ias_overview',
      svgIcon: true,
      counter: 'summary'
    },
    {
      title: 'Weather',
      link: 'weather',
      icon: 'ias_weather',
      svgIcon: true,
      counter: 'weather'
    },
    {
      title: 'Antennas',
      link: 'antennas',
      icon: 'ias_antenna',
      svgIcon: true,
      counter: 'antennas'
    },
    {
      title: 'Table',
      link: 'tabular',
      icon: 'ias_table',
      svgIcon: true,
      counter: ''
    }
  ];


  /**
   * Builds an instance of the application, with its related services and complements
   * @param {AlarmService} alarmService Service used to get the Alarms of this component
   * @param {AuthService} authService Service used for authentication
   * @param {UserService} userService Service used to manage information about user accounts
   * @param {SidenavService} actionsSidenavService Service for the navigation
   * @param {MatIconRegistry} matIconRegistry Angular material registry for custom icons
   * @param {DomSanitizer} matIconRegistry Angular material DOM sanitizer for custom icons
   * @param {Router} router instance of an Angular {@link Router} to handle routing
   */
  constructor(
    public alarmService: AlarmService,
    public authService: AuthService,
    public userService: UserService,
    public actionsSidenavService: SidenavService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public router: Router,
  ) {
    this.matIconRegistry
      .addSvgIcon(
        'ias_overview',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/img/ias-icon-overview.svg')
      )
      .addSvgIcon(
        'ias_weather',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/img/ias-icon-weather.svg')
      )
      .addSvgIcon(
        'ias_antenna',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/img/ias-icon-antenna.svg')
      )
      .addSvgIcon(
        'ias_table',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../assets/img/ias-icon-table.svg')
      );
  }

  /**
   * Method executed when the application is initiated
   * Initializes the {@link AlarmService} and passes its {@link actionsSidenav} to the {@link ActionsSidenavService} for it to control it
   */
  ngOnInit() {
    this.alarmService.initialize();
    this.actionsSidenavService.setSidenav(this.actionsSidenav);
    this.authService.loginStatusStream.subscribe(
      value => {
        if (value === false) {
          this.actionsSidenavService.close();
          this.router.navigate([{outlets: {primary: 'login', actions: null}}]);
        } else if (value === true) {
          this.userService.requestUsersList();
        }
      }
    );
  }

  /**
  * Returns the links for the router outlets to navigate the different views,
  * considering of the actionsSidenav can be closed or not
  * @param {any} item an item of the navigation sidenav
  * @returns {Object} The links in a dictionary
  */
  getActionsLink(item: any): Object {
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

  /**
   * Method to get the username
   " Uses the getUser method defined on the {@link AuthService}
   * @returns {string} the username
   */
  getUser(): string {
    return this.authService.getUser();
  }

  /**
   * Method to logout an authenticated user
   " Uses the logout method defined on the {@link AuthService}
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Method to get the class related to the count of the nav items
   * to highlight or not the presence of unack alarms by view
   " It is expected to use the countByView
   * defined on the {@link AlarmService}
   * and the configuration defined in the navigationSidenavItems
   * variable
   * @returns {string} the classname for the nav item mark
   */
   getNavItemCountClass(navItem: any, countByView: any): string {
     const navItemCounter = navItem.counter;
     const availableCounters = Object.keys(countByView);
     if (navItemCounter === '') {
       return 'hide-count';
     } else {
       if (availableCounters.indexOf(navItemCounter) > -1) {
         if (countByView[navItemCounter] > 0) {
           return 'nonzero-count';
         }
         if (countByView[navItemCounter] === 0) {
           return 'zero-count';
         }
       } else {
         return 'unknown-count';
       }

     }
   }

   /**
    * Method to get the text related to the mark of the nav items
    * to highlight or not the presence of unack alarms by view
    " It is expected to use the counterByView
    * defined on the {@link AlarmService}
    * and the configuration defined in the navigationSidenavItems
    * variable
    * @returns {string} the text related to the count for the nav item
    */
    getNavItemCountText(navItem: any, countByView: any): string {
      const navItemCounter = navItem.counter;
      const availableCounters = Object.keys(countByView);
      if (navItemCounter === '') {
        return '';
      } else {
        if (availableCounters.indexOf(navItemCounter) > -1) {
          const count = countByView[navItemCounter];
          if (count >= 0) {
            if (count <= 100) {
              return String(count);
            } else {
              return String('>100');
            }
          } else {
            return String(count);  // this case should not happen
          }
        } else {
          return '?';
        }

      }
    }

}
