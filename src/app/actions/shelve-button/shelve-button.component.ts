import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlarmService } from '../../data/alarm.service';
import { SidenavService } from '../sidenav.service';
import { Alarm } from '../../data/alarm';

/**
 * Button used to trigger the event to open the Shelve Modal
 */
@Component({
  selector: 'app-shelve-button',
  templateUrl: './shelve-button.component.html',
  styleUrls: ['./shelve-button.component.css']
})
export class ShelveButtonComponent implements OnInit {

  /**
   * Alarm object  associated to the button
   */
  @Input() alarm: Alarm;


  /**
   * @param {SidenavService} sidenavService Service to manage the Acknowledge and Shelve sidenav
   * @param {Router} router system Router to handle navigation
   */
  constructor(
    public sidenavService: SidenavService,
    private router: Router
  ) { }

  /**
   * Initialize the component
   */
  ngOnInit() {
  }

  /**
   * Returns the text to display in the shelve/unshelve button tooltip, either "Shelve" or "Unshelve"
   * @returns {string} the text to display in the button
   */
  getButtonTooltipText(): string {
    if (!this.alarm) {
      return null;
    }
    if (this.alarm.shelved) {
      return 'Unshelve';
    } else {
      return 'Shelve';
    }
  }

  /**
   * Defines wether or not the button is disabled
   * @returns {boolean} true if the button is disabled, false if not.
   */
  isDisabled() {
    return !this.sidenavService.canClose;
  }

  /**
  * Handle click on table rows, it triggers the shelve sidebar
  */
  onClick(event) {
    this.router.navigate([{outlets: {actions: ['shelve', this.alarm.core_id]}}]);
  }

}
