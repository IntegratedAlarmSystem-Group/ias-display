import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alarm } from '../alarm';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';


@Component({
  selector: 'app-ack-modal',
  templateUrl: './ack-modal.component.html',
  styleUrls: ['./ack-modal.component.css', './ack-modal.component.scss']
})
export class AckModalComponent implements OnInit {
  @Input() alarm;
  form: FormGroup

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alarmService: AlarmService,
    private cdbService: CdbService,
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      message: [null, [Validators.required]]
    });
  }

  ackSuccessful(alarms: any): void {
    console.log("Ack successful for alarms: ", alarms);
    this.activeModal.close();
  }

  acknowledge(): void {
    if(this.form.valid) {
      // Add the real call to acknoledge the alarm
      this.alarmService.acknowledgeAlarms(
        [this.alarm.core_id], this.form.get('message').value).subscribe(
          (response) => {
            this.ackSuccessful(response);
          },
          (error) => {
            console.log("Error: ", error);
            return error;
          }
        );
      // Show something to confirm the acknoledge was done
    } else {
      // Show a message, add a red asterisc, etc.
    }
  }

  getAlarmDescription(){
    return this.cdbService.getAlarmDescription(this.alarm.core_id);
  }

  getAlarmUrl(){
    return this.cdbService.getAlarmsInformationUrl();
  }

}