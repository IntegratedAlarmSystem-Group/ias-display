import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShelveModalComponent } from '../shelve-modal/shelve-modal.component';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';

@Component({
  selector: 'app-shelve-button',
  templateUrl: './shelve-button.component.html',
  styleUrls: ['./shelve-button.component.css']
})
export class ShelveButtonComponent implements OnInit {

  /**
   * Id of the alarm to be shelved
   */
  @Input() alarm_id: string;

  /**
   * Alarm object related with the alarm id received as input
   */
  public alarm: Alarm;


  /**
   * The "constructor", injects the {@link AlarmService} and the {@link modalService}
   * @param {AlarmService} alarmService Service to get the alarm object based on the input id
   * @param {ModalService} modalService Service to manage the Modal Component
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
  }

  /**
  * Handle click on table rows, it triggers the shelve modal
  */
  onClick(event) {
    const shelveModal = this.modalService.open(ShelveModalComponent,
      { size: 'lg', centered: true }
    );
    shelveModal.componentInstance.alarm = this.alarm;
    return shelveModal;
  }
}
