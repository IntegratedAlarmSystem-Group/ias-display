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
   * Alarm object to be acknowledged
   */
  @Input() alarm;

  form: FormGroup;

  /**
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
    } else {
      /* TODO: Show a message, add a red asterisc, etc. */
    }
  }

  /**
   * Get the alarm description through the method provided by the
   * {@link CdbService}
   */
  getAlarmDescription() {
    return this.cdbService.getAlarmDescription(this.alarm.core_id);
  }

  /**
   * Get the link to the wikipage of the alarm through the method provided
   * by the {@link CdbService}
   */
  getAlarmUrl() {
    return this.cdbService.getAlarmsInformationUrl();
  }

}
