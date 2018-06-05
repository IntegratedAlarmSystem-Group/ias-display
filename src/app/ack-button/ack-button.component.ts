import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AckModalComponent } from '../ack-modal/ack-modal.component';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';

/**
 * Button used to trigger the event to open the Acknowledge Modal
 */
@Component({
  selector: 'app-ack-button',
  templateUrl: './ack-button.component.html',
  styleUrls: ['./ack-button.component.css']
})
export class AckButtonComponent implements OnInit {

  /**
   * Id of the alarm to be acknowledged
   */
  @Input() alarm_id: string;

  /**
   * Alarm object related with the alarm id received as input
   */
  private alarm: Alarm;

  /**
   * Define if the alarm can be acknowledge based on if it was acknowledge
   * before.
   */
  private canAcknowledge = false;

  /**
   * The "constructor", injects the {@link AlarmService} and the {@link modalService}
   * @param alarmService Service to get the alarm object based on the input id
   * @param modalService Service to manage the Modal Component
   */
  constructor(
    private alarmService: AlarmService,
    private modalService: NgbModal
  ) { }

  /**
   * On init the component initialize the private variables using the method
   * {@link loadAlarm}
   */
  ngOnInit() {
    this.loadAlarm();
  }

  /**
   * Get the alarm object related with the alarm id received as input using the
   * AlarmService. Initialize the private variables of this component.
   */
  loadAlarm() {
    this.alarm = this.alarmService.get(this.alarm_id);
    this.canAcknowledge = !this.alarm.ack;
  }

  /**
  * Handle click on table rows, it triggers the ack modal
  */
  onClick(event) {
    const ackModal = this.modalService.open(AckModalComponent,
      { size: 'lg', centered: true }
    );
    ackModal.componentInstance.alarm = this.alarm;
    return ackModal;
  }

}
