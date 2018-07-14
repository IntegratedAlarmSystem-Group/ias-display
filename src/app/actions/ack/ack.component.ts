import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SidenavService } from '../sidenav.service';
import { AlarmService } from '../../data/alarm.service';
import { CdbService } from '../../data/cdb.service';
import { Alarm } from '../../data/alarm';

@Component({
  selector: 'app-ack',
  templateUrl: './ack.component.html',
  styleUrls: ['./ack.component.css', './ack.component.scss']
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
  ) { }

  ngOnInit() {
    this.message = new FormControl('', [Validators.required]);
    this.form = this.formBuilder.group({
      message: this.message,
    });
    this.route.paramMap.subscribe( paramMap => {
      this.alarm_id = paramMap.get('alarmID');
      this.reload();
    });
    this.sidenavService.open();
    this.getMissingAcksInfo();
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
  }

  /*
  * Closes the sidenav
  */
  onClose() {
    this.router.navigate([{outlets: {actions: null}}]);
  }

  /**
   * Send the acknowledge request through the method provided by the
   * {@link AlarmService} and handle the response.
   */
  acknowledge(): void {
    this.showSpinner();
    if (this.form.valid) {
      this.alarmService.acknowledgeAlarms(
        this.alarmsToAck, this.form.get('message').value).subscribe(
          (response) => {
            this.acknowledgedAlarms = <string[]> response;
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
   * Update the list of alarms to ack from the selection on the child component
   */
  updateAlarmsToAck(event): void {
    this.alarmsToAck = event;
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
  * Method to invalidate ack action
  */
  disableAcknowledgment() {
    const noAlarmsToAck = (this.alarmsToAck.length === 0);
    const validForm = this.form.valid;
    return (noAlarmsToAck || !validForm);
  }

  /**
  * Get the number of missed acknowledgements of the alarm and its children
  */
  getMissingAcksInfo(): void {
    if (this.alarm) {
      this.missedAcks = [];
      this.alarmService.getMissingAcks(this.alarm.core_id).subscribe(
        (response) => {
          for (const [key, value] of Object.entries(response)) {
            const count = value.length;
            if (count > 0) {
              let text = key + ' has ' + count + ' missed acknowledgement';
              if (count > 1) {
                text += 's';
              }
              this.missedAcks.push(text);
            }
          }
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
    }
    return response;
  }
}
