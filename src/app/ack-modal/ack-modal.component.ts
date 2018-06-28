import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';
import { Alarm } from '../alarm';


/**
 * Modal used to acknowledge alarms
 */
@Component({
  selector: 'app-ack-modal',
  templateUrl: './ack-modal.component.html',
  styleUrls: ['./ack-modal.component.css', './ack-modal.component.scss']
})
export class AckModalComponent implements OnInit {

  /**
   * Selected alarm
   */
  @Input() alarm;

  /**
   * List of alarms to ack according to selection from child component
   */
  alarmsToAck: string[] = [];

  /**
   * Object used to manage the form and check the validity of the form input fields
   */
  form: FormGroup;

  /**
  *
  */
  public missedAcks: string[] = [];

  /**
   * Instantiates the component
   * @param {ActiveModal} activeModal Reference to itself
   * @param {FormBuilder} formBuilder Service to manage the form and validators
   * @param {AlarmService} alarmService Service used to send the request to acknowledge the alarm
   * @param {CdbService} cdbService Service used to get complementary alarm information
   * @param {SpinnerService} spinnerService Service to provide the loading spinner functionality
   */
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alarmService: AlarmService,
    private cdbService: CdbService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  /**
   * Create the form and check the validity of the form input fields
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      message: [null, [Validators.required]]
    });
    this.getMissingAcksInfo();
  }

  /**
   * Actions performed when the acknowledge is made ssuccesfully.
   * Finally the modal is closed.
   * @param alarms list of sucessfully acknowledged alarms
   */
  ackSuccessful(alarms: any): void {
    console.log('Ack successful for alarms: ', alarms);
    this.activeModal.close();
  }

  /**
   * Send the acknowledge request through the method provided by the {@link AlarmService} and handle the response.
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
