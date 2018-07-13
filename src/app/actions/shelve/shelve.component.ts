import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';
import { SidenavService } from '../sidenav.service';
import { AlarmService } from '../../data/alarm.service';
import { CdbService } from '../../data/cdb.service';
import { Alarm } from '../../data/alarm';

/**
* Definition of a timeout option for shelving an alarm
*/
export interface TimeoutOption {

  /** The actual value to be sent to the server */
  value: string;

  /** The value to be displayed to the user */
  viewValue: string;
}

/**
 * Component used to acknowledge alarms
 */
@Component({
  selector: 'app-shelve',
  templateUrl: './shelve.component.html',
  styleUrls: ['./shelve.component.css', './shelve.component.scss']
})
export class ShelveComponent implements OnInit, OnDestroy {

  /**
  * Timeout options for shelving alarms
  */
  timeouts: TimeoutOption[] = [
    {value: '0:15:00', viewValue: '15 minutes'},
    {value: '0:30:00', viewValue: '30 minutes'},
    {value: '1:00:00', viewValue: '1 hour'},
    {value: '2:00:00', viewValue: '2 hours'},
    {value: '6:00:00', viewValue: '6 hours'},
    {value: '12:00:00', viewValue: '12 hours'},
  ];

  /**
   * Default timeout for shelving
   */
  defaultTimeout = this.timeouts[0].value;

  /**
   * Id of the Alarm object to be shelved/unshelved
   */
  alarm_id: string;

  /**
   * Alarm object to be shelved/unshelved
   */
  alarm: Alarm;

  /**
   * Object used to manage the form and check the validity of the form input fields
   */
  form: FormGroup;

  /**
  * FormControl for the shelve message
  */
  message: FormControl;

  /**
  * FormControl for the shelve timeout
  */
  timeout: FormControl;

  /**
  * Stores wether or not the action has been executed requestStatusly
  * If requestStatus = 0, the request has not been sent yet
  * If requestStatus = 1, the request was successfully
  * If requestStatus = -1, the request has failed
  */
  requestStatus = 0;

  /**
   * Instantiates the component
   * @param {FormBuilder} formBuilder Service to manage the form and validators
   * @param {AlarmService} alarmService Service used to send the request to acknowledge the alarm
   * @param {CdbService} cdbService Service used to get complementary alarm information
   * @param {SpinnerService} spinnerService Service to provide the loading spinner functionality
   */
  constructor(
    private formBuilder: FormBuilder,
    private alarmService: AlarmService,
    private cdbService: CdbService,
    private route: ActivatedRoute,
    public sidenavService: SidenavService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) {
  }

  /**
   * Get the alarmID from the url, create the form and open the sidenav
   */
  ngOnInit() {
    this.message = new FormControl('', [Validators.required]);
    this.timeout = new FormControl(this.defaultTimeout, [Validators.required]);
    this.form = this.formBuilder.group({
      message: this.message,
      timeout: this.timeout
    });
    this.route.paramMap.subscribe( paramMap => {
      this.alarm_id = paramMap.get('alarmID');
      this.reload();
    });
    this.sidenavService.open();
  }

  /*
  * Closes the sidenav when the component is destroyed
  */
  ngOnDestroy() {
    this.sidenavService.close();
  }

  /**
  * Cleans the component and reloads the Alarm
  */
  reload() {
    this.alarm = this.alarmService.get(this.alarm_id);
    this.requestStatus = 0;
    this.message.reset();
    this.timeout.reset(this.defaultTimeout);
  }

  /*
  * Closes the sidenav
  */
  onClose() {
    this.router.navigate([{outlets: {actions: null}}]);
  }

  /**
   * Send the shelve/unshelve request through the method provided by the {@link AlarmService} and handle the response.
   */
  toggleShelveUnshelve(): void {
    if (this.alarm.shelved) {
      this.unshelve();
    } else {
      this.shelve();
    }
  }

  /**
   * Calls the webserver to apply the shelving of the alarm
   */
  shelve() {
    this.showSpinner();
    const message = this.message.value;
    const timeout = this.timeout.value;
    if (this.canSend()) {
      this.alarmService.shelveAlarm(this.alarm.core_id, message, timeout).pipe(delay(4000)).subscribe(
          (response) => {
            this.requestStatus = 1;
            this.hideSpinner();
          },
          (error) => {
            console.log('Error: ', error);
            this.requestStatus = -1;
            this.hideSpinner();
            return error;
          }
        );
    } else {
      this.hideSpinner();
      /* TODO: Show a message, add a red asterisc, etc. */
    }
  }

  /**
   * Calls the webserver to apply the unshelving of the alarm
   */
  unshelve() {
    this.showSpinner();
    if (this.canSend()) {
      this.alarmService.unshelveAlarms(
        [this.alarm.core_id], this.form.get('message').value).pipe(delay(4000)).subscribe(
          (response) => {
            this.requestStatus = 1;
            this.hideSpinner();
          },
          (error) => {
            console.log('Error: ', error);
            this.requestStatus = -1;
            this.hideSpinner();
            return error;
          }
        );
    } else {
      this.hideSpinner();
      /* TODO: Show a message, add a red asterisc, etc. */
    }
  }

  /**
  * Shows a spinner used to indicate the user that the Alarm is being shelved/unshelved
  * It also blocks closing and navigation of the the Sidebar
  */
  private showSpinner() {
    this.sidenavService.canClose = false;
    this.spinnerService.show();
  }

  /**
  * Hides the spinner after the Alarm has been shelved/unshelved
  * It also unblocks closing and navigation of the the Sidebar
  */
  private hideSpinner() {
    this.spinnerService.hide();
    this.sidenavService.canClose = true;
  }

  /**
   * Defines wether the Shelve/unshelve action can be done or not, based on the status of the Alarm and the validity of the form
   * @returns {boolean} true if the action can be sent, false if not
   */
  canSend(): boolean {
    return this.alarm.shelved || this.form.valid;
  }

  /**
   * Get the alarm description through the method provided by the {@link CdbService}
   * @returns {string} description of the {@link Alarm}
   */
  getAlarmDescription() {
    return this.cdbService.getAlarmDescription(this.alarm.core_id);
  }

  /**
   * Get the link to the wikipage of the alarm through the method provided by the {@link CdbService}
   * @returns {string} URL for of the documentation of the {@link Alarm}
   */
  getAlarmUrl() {
    return this.cdbService.getAlarmsInformationUrl(this.alarm.core_id);
  }

  /**
   * Returns the text to display in the title, depeding if the alarm is "Shelved" or "Unshelved"
   * @returns {string} the text to display in the title
   */
  getTitleText(): string {
    if (!this.alarm) {
      return null;
    }
    if (this.alarm.shelved) {
      return 'ALARM UNSHELVING';
    } else {
      return 'ALARM SHELVING';
    }
  }

  /**
   * Returns the text to display in the action button, either "Shelve" or "Unshelve"
   * @returns {string} the text to display in the button
   */
  getActionButtonText(): string {
    if (!this.alarm) {
      return null;
    }
    if (this.alarm.shelved) {
      return 'Unshelve';
    } else {
      return 'Shelve';
    }
  }

  getResponseMessageTitle(): string {
    if (!this.alarm.shelved) {
      return 'Shelving results';
    } else {
      return 'Unshelving results';
    }
  }

  /**
   * Returns the text to display when the shelve or unshelve action is performed
   * @returns {string} the text to display
   */
  getResponseMessageText(): string {
    if (!this.alarm) {
      return null;
    }
    if (this.requestStatus === 1) {
      if (!this.alarm.shelved) {
        return 'The alarm ' + this.alarm.core_id + ' was shelved succesfully for ' +
        this.timeouts.find(t => t.value === this.timeout.value).viewValue + '.';
      } else {
        return 'The alarm ' + this.alarm.core_id + ' was unshelved succesfully.';
      }
    } else if (this.requestStatus === -1) {
      let response = '';
      if (!this.alarm.shelved) {
        response = 'The request has failed, the alarm ' + this.alarm.core_id + ' has not been shelved.';
      } else {
        response = 'The request has failed, the alarm ' + this.alarm.core_id + ' has not been unshelved.';
      }
      response += ' Please try again. If the problem persists, contact the system administrator.';
      return response;
    }
  }

}
