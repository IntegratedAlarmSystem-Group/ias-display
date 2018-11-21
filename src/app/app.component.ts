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
    { title: 'Overview', link: 'overview', icon: 'ias_overview', svgIcon: true},
    { title: 'Weather', link: 'weather', icon: 'ias_weather', svgIcon: true},
    { title: 'Antennas', link: 'antennas', icon: 'ias_antenna', svgIcon: true},
    { title: 'Table', link: 'tabular', icon: 'ias_table', svgIcon: true}
  ];

  /**
   * Builds an instance of the application, with its related services and complements
   * @param {AlarmService} alarmService Service used to get the Alarms of this component
   * @param {AuthService} authService Service used for authentication
   * @param {SidenavService} actionsSidenavService Service for the navigation
   * @param {MatIconRegistry} matIconRegistry Angular material registry for custom icons
   * @param {DomSanitizer} matIconRegistry Angular material DOM sanitizer for custom icons
   * @param {Router} router instance of an Angular {@link Router} to handle routing
   */
  constructor(
    private alarmService: AlarmService,
    private authService: AuthService,
    private userService: UserService,
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
    this.userService.requestUsersList();
    this.actionsSidenavService.setSidenav(this.actionsSidenav);
    this.authService.loginStatusStream.subscribe(
      value => {
        if (value === false) {
          this.actionsSidenavService.close();
          this.router.navigate([{outlets: {primary: 'login', actions: null}}]);
          this.alarmService.destroy();
        }
      }
    );
  }

  /**
  * Returns the links for the router outlets to navigate the different views, considering of the actionsSidenav can be closed or not
  * @param {any} item an item of the navigation sidenav
  * @returns {Object} The links in a dictionary
  */
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

  /**
   * Method to get the username
   " Uses the getUser method defined on the {@link AuthService}
   * @returns {string} the username
   */
  getUser() {
    return this.authService.getUser();
  }

  /**
   * Method to check if a user is logged in
   " Uses the isLoggedIn method defined on the {@link AuthService}
   * @returns {boolean} True if the user is logged in
   */
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  /**
   * Method to logout an authenticated user
   " Uses the logout method defined on the {@link AuthService}
   */
  logout() {
    this.authService.logout();
  }

}
