import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';
import { Alarm } from '../alarm';

@Component({
  selector: 'app-shelve-modal',
  templateUrl: './shelve-modal.component.html',
  styleUrls: ['./shelve-modal.component.css']
})
export class ShelveModalComponent implements OnInit {

  /**
   * Alarm object to be shelved/unshelved
   */
  @Input() alarm;

  /**
   * Object used to manage the form and check the validity of the form input fields
   */
  form: FormGroup;

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
  }

  /**
   * Actions performed when the acknowledge is made ssuccesfully.
   * Finally the modal is closed.
   * @param alarms list of sucessfully acknowledged alarms
   */
  sendSuccessful(alarms: any, shelve: boolean): void {
    if (shelve) {
      console.log('Shelved successful for alarms: ', alarms);
    } else {
      console.log('Unshelved successful for alarms: ', alarms);
    }
    this.activeModal.close();
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

  shelve() {
    this.spinnerService.show();
    if (this.canSend()) {
      this.alarmService.shelveAlarm(
        this.alarm.core_id, this.form.get('message').value).subscribe(
          (response) => {
            this.sendSuccessful(response, true);
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

  unshelve() {
    this.spinnerService.show();
    if (this.canSend()) {
      this.alarmService.unshelveAlarms(
        [this.alarm.core_id], this.form.get('message').value).subscribe(
          (response) => {
            this.sendSuccessful(response, false);
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
}
