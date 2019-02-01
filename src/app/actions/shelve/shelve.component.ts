import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SidenavService } from '../sidenav.service';
import { AlarmService } from '../../data/alarm.service';
import { UserService } from '../../data/user.service';
import { AuthService } from '../../auth/auth.service';
import { Alarm } from '../../data/alarm';
import { SubscriptionLike as ISubscription } from 'rxjs';

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
  styleUrls: ['./shelve.component.scss']
})
export class ShelveComponent implements OnInit, OnDestroy {

  /**
  * Timeout options for shelving alarms
  */
  timeouts: TimeoutOption[] = [
    {value: '00:15:00', viewValue: '15 minutes'},
    {value: '00:30:00', viewValue: '30 minutes'},
    {value: '01:00:00', viewValue: '1 hour'},
    {value: '02:00:00', viewValue: '2 hours'},
    {value: '06:00:00', viewValue: '6 hours'},
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
  * FormControl for the user who performs the action
  */
  user: FormControl;

  /**
   * Selected user
   */
  user_selected: string;

  /**
  * Stores wether or not the action has been executed requestStatusly
  * If requestStatus = 0, the request has not been sent yet
  * If requestStatus = 1, the request was successfully
  * If requestStatus = -1, the request has failed
  */
  requestStatus = 0;

  /**
  * Stores the error message returned by the Webserver if a shelve or unshelve request fails
  */
  errorMessage = '';

  /**
  * Stores the message with the information of when the alarm has been shelved and for how long
  */
  shelvedAtMessage = '';

  /**
   * Route param map subscription
   */
  paramMapSubscription: ISubscription;

   /**
    * Alarm change subscription
    */
  alarmChangeSubscription: ISubscription;

  /**
   * Sidenav service subscription
   */
 sidenavReloadSubscription: ISubscription;


  /**
   * Instantiates the component
   * @param {FormBuilder} formBuilder Service to manage the form and validators
   * @param {AlarmService} alarmService Service used to send the request to acknowledge the alarm
   * @param {NgxSpinnerService} spinnerService Service to provide the loading spinner functionality
   * @param {Route} route Reference to the url that triggered the initialization of this component
   * @param {SidenavService} sidenavService Service to handle the sidenav where the component is opened
   * @param {UserService} userService Service to handle request to the users api
   * @param {AuthService} authService Service to ask for the logged in user
   */
  constructor(
    private formBuilder: FormBuilder,
    private alarmService: AlarmService,
    private route: ActivatedRoute,
    public sidenavService: SidenavService,
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    public authService: AuthService
  ) {
  }

  /**
   * Get the alarmID from the url, create the form and open the sidenav
   */
  ngOnInit() {
    this.user = new FormControl('', [Validators.required]);
    this.message = new FormControl('', [Validators.required]);
    this.timeout = new FormControl(this.defaultTimeout, [Validators.required]);
    this.shelvedAtMessage = '';
    this.form = this.formBuilder.group({
      user: this.user,
      message: this.message,
      timeout: this.timeout
    });
    this.paramMapSubscription = this.route.paramMap
    .subscribe( paramMap => {
      this.alarm_id = paramMap.get('alarmID');
      this.check_request_and_reload();
    });
    this.sidenavReloadSubscription = this.sidenavService.shouldReload
    .subscribe(
      value => {
        if (value === true) {
          this.check_request_and_reload();
        }
      }
    );
    this.alarmChangeSubscription = this.alarmService.alarmChangeStream
    .subscribe( () => {
      this.check_request_and_reload();
    });
    this.sidenavService.open();
  }

  /**
  * Method to manage the information of the component
  */
  check_request_and_reload(): void {
    const alarmDataAvailable = this.alarmService.isAlarmIndexAvailable(
      this.alarm_id
    );
    if (alarmDataAvailable === true) {
      if (this.alarm) {
        if (this.alarm.core_id !== this.alarm_id) {
          this.reload();
        }
      } else {
        this.reload();
      }
    }
  }

  /**
  * Closes the sidenav when the component is destroyed
  */
  ngOnDestroy() {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.sidenavReloadSubscription) {
      this.sidenavReloadSubscription.unsubscribe();
    }
    if (this.alarmChangeSubscription) {
      this.alarmChangeSubscription.unsubscribe();
    }
    this.sidenavService.closeAndClean();
  }

  /**
   * Defines wether the Shelve/unshelve action can be done or not, based on the status of the Alarm and the validity of the form
   * @returns {boolean} True if shelve action can be performed and false if not
   */
  canSend(): boolean {
    const allowedShelve = this.authService.getAllowedActions()['can_shelve'];
    const allowedUnshelve = this.authService.getAllowedActions()['can_unshelve'];
    const isAllowed = allowedShelve && allowedUnshelve;
    return (this.alarm.shelved || this.form.valid) && isAllowed;
  }

  /**
   * Returns the text to display in the action button
   * @returns {string} the text to display in the button, either "Shelve" or "Unshelve"
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
   * Returns the text to display in the title
   * @returns {string} the text to display in the title, either "Shelving results" or "Unshelving results"
   */
  getResponseMessageTitle(): string {
    let action: string;
    if (!this.alarm.shelved) {
      action = 'Shelving';
    } else {
      action = 'Unshelving';
    }
    if (this.requestStatus === 1) {
      return action + ' results';
    } else if (this.requestStatus === -1 ) {
      return 'Error ' + action;
    } else if (this.requestStatus === -2) {
      return 'Action not allowed';
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
    let response = '';
    if (this.requestStatus === 1) {
      if (!this.alarm.shelved) {
        response = 'The alarm ' + this.alarm.core_id + ' was shelved succesfully for ' +
        this.timeouts.find(t => t.value === this.timeout.value).viewValue + '.';
      } else {
        response = 'The alarm ' + this.alarm.core_id + ' was unshelved succesfully.';
      }
    } else if (this.requestStatus === -1) {
      if (!this.alarm.shelved) {
        response = 'The request has failed, the alarm ' + this.alarm.core_id + ' has not been shelved.';
      } else {
        response = 'The request has failed, the alarm ' + this.alarm.core_id + ' has not been unshelved.';
      }
      response += ' Please try again. If the problem persists, contact the system administrator.';
    } else if (this.requestStatus === -2 ) {
      response = 'The logged in user (' + this.authService.getUser();
      if (!this.alarm.shelved) {
        response += ') does not have permissions to perform the shelve.';
      } else {
        response += ') does not have permissions to perform the unshelve.';
      }
    }
    return response;
  }


  /**
  * Closes the sidenav
  */
  onClose(): void {
    this.sidenavService.closeAndClean();
  }

  /**
  * Cleans the component and reloads the Alarm
  */
  reload(): void {
    this.shelvedAtMessage = '';
    this.alarm = this.alarmService.get(this.alarm_id);
    if (this.alarm.shelved) {
      this.requestShelveInfo();
    }
    this.requestStatus = 0;
    this.message.reset();
    this.timeout.reset(this.defaultTimeout);
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
   * Requests the alarm shelving info to the Webserver
   */
  requestShelveInfo(): void {
    this.alarmService.getShelveRegistries(this.alarm_id, 1).subscribe(
        (response) => {
          const registry = response[0];
          this.shelvedAtMessage = 'This Alarm was shelved at ' + registry['shelved_at'] +
          ' with a duration of ' + this.timeouts.find(t => t.value === registry['timeout']).viewValue;
        },
        (error) => {
          console.log('Error: ', error);
          return error;
        }
      );
  }

  /**
   * Calls the webserver to apply the shelving of the alarm
   */
  shelve(): void {
    this.showSpinner();
    const message = this.message.value;
    const timeout = this.timeout.value;
    if (this.canSend()) {
      this.alarmService.shelveAlarm(
        this.alarm.core_id, message, timeout, this.user_selected
      ).subscribe(
          (response) => {
            this.requestStatus = 1;
            this.hideSpinner();
            this.errorMessage = '';
          },
          (error) => {
            if (error.status === 403) {
              this.requestStatus = -2;
            } else {
              this.requestStatus = -1;
            }
            this.hideSpinner();
            this.errorMessage = error['error'];
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
  unshelve(): void {
    this.showSpinner();
    if (this.canSend()) {
      this.alarmService.unshelveAlarms(
        [this.alarm.core_id], this.form.get('message').value).subscribe(
          (response) => {
            this.requestStatus = 1;
            this.hideSpinner();
            this.errorMessage = '';
          },
          (error) => {
            console.log('Error: ', error);
            this.requestStatus = -1;
            this.hideSpinner();
            this.errorMessage = error['error'];
            return error;
          }
        );
    } else {
      this.hideSpinner();
      /* TODO: Show a message, add a red asterisc, etc. */
    }
  }

  /**
  * Hides the spinner after the Alarm has been shelved/unshelved
  * It also unblocks closing and navigation of the the Sidebar
  */
  private hideSpinner(): void {
    this.spinnerService.hide();
    this.sidenavService.canClose = true;
  }

  /**
  * Shows a spinner used to indicate the user that the Alarm is being shelved/unshelved
  * It also blocks closing and navigation of the the Sidebar
  */
  private showSpinner(): void {
    this.sidenavService.canClose = false;
    this.spinnerService.show();
  }

}
