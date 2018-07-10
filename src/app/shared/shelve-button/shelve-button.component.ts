import { Component, OnInit, Input } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { Alarm } from '../../data/alarm';
import { Router } from '@angular/router';

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
   * Id of the alarm to be shelved
   */
  @Input() alarm_id: string;

  /**
   * Alarm object related with the alarm id received as input
   */
  public alarm: Alarm;


  /**
   * The "constructor", injects the {@link AlarmService}
   * @param {AlarmService} alarmService Service to get the alarm object based on the input id
   */
  constructor(
    private alarmService: AlarmService,
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
   * Get the alarm object related with the alarm id received as input using the
   * AlarmService. Initialize the private variables of this component.
   */
  loadAlarm() {
    this.alarm = this.alarmService.get(this.alarm_id);
  }

  /**
  * Handle click on table rows, it triggers the shelve sidebar
  */
  onClick(event) {
    this.router.navigate([{outlets: {actions: ['shelve', this.alarm_id]}}]);
  }

}
