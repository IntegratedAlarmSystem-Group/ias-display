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
  * List of alarms to ack according to selection from child component
  */
  alarmsToAck: string[] = [];

  /**
  * List of messages to mention the alarms with missed acknowledgments
  */
  public missedAcks: string[] = [];


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
    this.form = this.formBuilder.group({
      message: [null, [Validators.required]]
    });
    this.route.paramMap.subscribe( paramMap => {
      this.alarm_id = paramMap.get('alarmID');
      this.alarm = this.alarmService.get(this.alarm_id);
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

  /*
  * Closes the sidenav
  */
  onClose() {
    this.router.navigate([{outlets: {actions: null}}]);
  }

  /**
   * Actions performed when the acknowledge is made ssuccesfully.
   * @param alarms list of sucessfully acknowledged alarms
   */
  ackSuccessful(alarms: any): void {
    console.log('Ack successful for alarms: ', alarms);
    this.onClose();
  }

  /**
   * Send the acknowledge request through the method provided by the
   * {@link AlarmService} and handle the response.
   */
  acknowledge(): void {
    this.spinnerService.show();
    if (this.form.valid) {
      this.alarmService.acknowledgeAlarms(
        [this.alarm.core_id], this.form.get('message').value).subscribe(
          (response) => {
            this.ackSuccessful(response);
            this.spinnerService.hide();
          },
          (error) => {
            console.log('Error: ', error);
            this.spinnerService.hide();
            return error;
          }
        );
    }
  }

  /**
   * Ack request through the related {@link AlarmService} method using a list of dependencies
   * from the selected alarms
   */
  ackFromSelection(): void {
    this.spinnerService.show();
    if (this.form.valid) {
      this.alarmService.acknowledgeAlarms(
        this.alarmsToAck, this.form.get('message').value).subscribe(
          (response) => {
            this.ackSuccessful(response);
            this.spinnerService.hide();
          },
          (error) => {
            console.log('Error: ', error);
            this.spinnerService.hide();
            return error;
          }
        );
    }
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
}
