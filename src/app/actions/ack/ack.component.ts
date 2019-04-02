import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SidenavService } from '../sidenav.service';
import { AlarmService } from '../../data/alarm.service';
import { UserService } from '../../data/user.service';
import { AuthService } from '../../auth/auth.service';
import { Alarm } from '../../data/alarm';
import { Locale } from '../../settings';

/**
* Component used to perform acknowledgement of an Alarm
*/
@Component({
  selector: 'app-ack',
  templateUrl: './ack.component.html',
  styleUrls: ['./ack.component.scss']
})
export class AckComponent implements OnInit, OnDestroy {

  /**
   * Id of the Alarm object to be acknowledge/unacknowledge
   */
  alarm_id: string;

  /**
   * Alarm object to be acknowledge/unacknowledge
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
  * FormControl for the user who performs the action
  */
  user: FormControl;

  /**
   * Selected user
   */
  user_selected: string;

  /**
  * List of alarms to ack according to selection from child component
  */
  alarmsToAck: string[] = [];

  /**
  * List of alarms that were acknowledged by the request
  */
  acknowledgedAlarms: string[] = [];

  /**
  * List of messages to mention the alarms with missed acknowledgments
  */
  public missedAcks: string[] = [];

  /**
  * Stores wether or not the action has been executed requestStatusly
  * If requestStatus = 0, the request has not been sent yet
  * If requestStatus = 1, the request was successfully
  * If requestStatus = -1, the request has failed
  */
  requestStatus = 0;

  /**
   * Route param map subscription
   */
  paramMapSubscription: ISubscription;

   /**
    * Subscription to changes in Alarms
    */
  alarmChangeSubscription: ISubscription;

  /** Timestamp for the last change in the alarm noticed by the component */
  private lastValueChangeTime = -1;

  /** String to store the formatting of dates, read form the settings */
  private dateFormat: string;

  /** String to store the timezone to display dates, read from the settings */
  private timezone: string;

  /**
   * Instantiates the component
   * @param {FormBuilder} formBuilder Service to manage the form and validators
   * @param {AlarmService} alarmService Service used to send the request to acknowledge the alarm
   * @param {Route} route Reference to the url that triggered the initialization of this component
   * @param {SidenavService} sidenavService Service to handle the sidenav where the component is opened
   * @param {NgxSpinnerService} spinnerService Service to provide the loading spinner functionality
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
    public authService: AuthService,
  ) { }

  /**
  * Initiates the component, by getting the alarm_id from the url.
  */
  ngOnInit() {
    this.dateFormat = Locale.DATE_FORMAT;
    this.timezone = Locale.TIMEZONE;
    this.user = new FormControl('', [Validators.required]);
    this.message = new FormControl('', [Validators.required]);
    this.form = this.formBuilder.group({
      user: this.user,
      message: this.message,
    });
    this.paramMapSubscription = this.route.paramMap
    .subscribe( paramMap => {
      this.alarm_id = paramMap.get('alarmID');
      this.check_request_and_reload();
    });
    this.alarmChangeSubscription = this.alarmService.alarmChangeStream
    .subscribe( () => {
      this.check_request_and_reload();
    });
    this.sidenavService.open();
  }

  /**
  * Closes the sidenav when the component is destroyed
  */
  ngOnDestroy() {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.alarmChangeSubscription) {
      this.alarmChangeSubscription.unsubscribe();
    }
    this.sidenavService.closeAndClean();
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
        } else {
          this.reload({onlyMissingAcksInfo: true});
        }
      } else {
        this.reload();
      }
    }
  }

  /**
  * Cleans the component and reloads the Alarm
  */
  reload({onlyMissingAcksInfo= false}: {onlyMissingAcksInfo?: boolean} = {}): void {
    if (onlyMissingAcksInfo === false) {
      this.alarm = this.alarmService.get(this.alarm_id);
      this.requestStatus = 0;
      this.message.reset();
    }
    if (this.alarm.value_change_timestamp !== this.lastValueChangeTime) {
      this.getMissingAcksInfo();
      this.lastValueChangeTime = this.alarm.value_change_timestamp;
    }
  }

  /**
  * Closes the sidenav
  */
  onClose(): void {
    this.sidenavService.closeAndClean();
  }

  /**
   * Send the acknowledge request through the method provided by the
   * {@link AlarmService} and handle the response.
   */
  acknowledge(): void {
    this.showSpinner();
    if (this.form.valid) {
      this.alarmService.acknowledgeAlarms(
        this.alarmsToAck, this.form.get('message').value, this.user_selected).subscribe(
          (response: any) => {
            this.acknowledgedAlarms = <string[]> response;
            this.requestStatus = 1;
            this.hideSpinner();
          },
          (error: any) => {
            if (error.status === 403) {
              this.requestStatus = -2;
            } else {
              this.requestStatus = -1;
            }
            this.hideSpinner();
            return error;
          }
        );
    }
  }

  /**
  * Shows a spinner used to indicate the user that the Alarm is being shelved/unshelved
  * It also blocks closing and navigation of the the Sidebar
  */
  private showSpinner(): void {
    this.sidenavService.canClose = false;
    this.spinnerService.show();
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
   * Update the list of alarms to ack from the selection on the child component
   * @param {Event} event event triggered by the inner {@link AckTree}, containing the IDs fo the alarms to acknowledge
   */
  updateAlarmsToAck(event: string[]): void {
    this.alarmsToAck = event;
  }

  /**
  * Method to invalidate ack action
  * @returns {boolean} True if ack action can be performed and false if not
  */
  disableAcknowledgment(): boolean {
    const noAlarmsToAck = (this.alarmsToAck.length === 0);
    const validForm = this.form.valid;
    const isAllowed = this.authService.getAllowedActions()['can_ack'];
    let isAck = false;
    if (this.alarm) {
      isAck = this.alarm.ack;
    }
    return (noAlarmsToAck || !validForm || !isAllowed || isAck);
  }

  /**
  * Get the number of missed acknowledgements of the alarm and its children
  */
  getMissingAcksInfo(): void {
    if (this.alarm) {
      const missedAcks = [];
      this.alarmService.getMissingAcks(this.alarm.core_id).subscribe(
        (response) => {
          for (const [key, value] of Object.entries(response)) {
            const count = value.length;
            if (count > 0) {
              let text = key + ' has ' + count + ' missed acknowledgement';
              if (count > 1) {
                text += 's';
              }
              missedAcks.push(text);
            }
          }
          this.missedAcks = missedAcks;
        }
      );
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
      response = 'The following alarms have been acknowledged succesfully:';

    } else if (this.requestStatus === -1) {
      response = 'The request has failed, the alarm ' + this.alarm.core_id + ' has not been acknowledged.';
      response += ' Please try again. If the problem persists, contact the system administrator.';
    } else if (this.requestStatus === -2) {
      response = 'The logged in user (' + this.authService.getUser();
      response += ') does not have permissions to perform the acknowledgement. ';
    }
    return response;
  }

  /**
   * Returns the title to display when the shelve or unshelve action is performed
   * @returns {string} the title to display
   */
  getResponseMessageTitle(): string {
    if (!this.alarm) {
      return null;
    }
    let response = '';
    if (this.requestStatus === 1) {
      response = 'Acknowledgement results';

    } else if (this.requestStatus === -1) {
      response = 'Error acknowledging';
    } else if (this.requestStatus === -2) {
      response = 'Action not allowed';
    }
    return response;
  }
}
