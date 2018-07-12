import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlarmService } from '../../data/alarm.service';
import { Router } from '@angular/router';
import { Alarm } from '../../data/alarm';

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
   * Define if the alarm can be acknowledged based on if it was acknowledged before.
   */
  public canAcknowledge = false;

  /**
   * The "constructor", injects the {@link AlarmService} and the {@link modalService}
   * @param {AlarmService} alarmService Service to get the alarm object based on the input id
   * @param {ModalService} modalService Service to manage the Modal Component
   */
  constructor(
    private alarmService: AlarmService,
    private modalService: NgbModal,
    private router: Router
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
    this.router.navigate([{outlets: {actions: ['acknowledge', this.alarm_id]}}]);
  }

}
