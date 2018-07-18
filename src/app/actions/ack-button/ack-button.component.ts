import { Component, OnInit, Input } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
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
   * Id of the alarm to be acknowledged
   */
  @Input() alarm_id: string;

  /**
   * Alarm object related with the alarm id received as input
   */
  private alarm: Alarm;

  /**
   * Define if the alarm can be acknowledged based on if it was acknowledged before.
   */
  public canAcknowledge = false;

  /**
   * @param {AlarmService} alarmService Service to get the alarm object based on the input id
   */
  constructor(
    private alarmService: AlarmService,
    public sidenavService: SidenavService,
    private router: Router
  ) { }

  /**
   * On init the component initialize the private variables using the method
   * {@link loadAlarm}
   */
  ngOnInit() {
    this.loadAlarm();
  }

  /**
   * Get the alarm object related with the alarm id received as input using the
   * AlarmService. Initialize the private variables of this component.
   */
  loadAlarm() {
    this.alarm = this.alarmService.get(this.alarm_id);
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
    this.router.navigate([{outlets: {actions: ['acknowledge', this.alarm_id]}}]);
  }

}
