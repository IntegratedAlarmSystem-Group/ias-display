import { Component, OnInit, Input } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { Router } from '@angular/router';
import { Alarm } from '../../data/alarm';

/**
 * Button used to trigger the event to open the Acknowledge Modal
 */
@Component({
  selector: 'app-ack-button',
  templateUrl: './ack-button.component.html',
  styleUrls: ['./ack-button.component.css']
})
export class AckButtonComponent implements OnInit {

  /**
   * Alarm object related with the alarm id received as input
   */
  @Input() alarm: Alarm;

  /**
   * Define if the alarm can be acknowledged based on if it was acknowledged before.
   */
  public canAcknowledge = false;

  /**
   * @param {SidenavService} sidenavService Service to manage the Acknowledge and Shelve sidenav
   * @param {Router} router system Router to handle navigation
   */
  constructor(
    public sidenavService: SidenavService,
    private router: Router
  ) { }

  /**
   * On init the component initialize the private variables using the method {@link loadAlarm}
   */
  ngOnInit() {
    this.loadAlarm();
  }

  /**
   * Initializes the private variable {@link canAcknowledge} of this component.
   */
  loadAlarm() {
    this.canAcknowledge = !this.alarm.ack;
  }

  /**
   * Defines wether or not the button is disabled
   * @returns {boolean} true if the button is disabled, false if not.
   */
  isDisabled() {
    return !this.sidenavService.canClose || !this.canAcknowledge;
  }

  /**
  * Handle click on table rows, it triggers the ack modal
  */
  onClick(event) {
    this.router.navigate([{outlets: {actions: ['acknowledge', this.alarm.core_id]}}]);
  }

}
