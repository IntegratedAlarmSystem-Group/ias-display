import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AckModalComponent } from '../ack-modal/ack-modal.component';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';

@Component({
  selector: 'app-ack-button',
  templateUrl: './ack-button.component.html',
  styleUrls: ['./ack-button.component.css']
})
export class AckButtonComponent implements OnInit {

  @Input() alarm_id: string;

  constructor(private alarmService: AlarmService,
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  /**
  * Handle click on table rows, it triggers the ack modal
  */
  onClick(event){
    let alarm = this.alarmService.get(this.alarm_id)
    console.log('click, alarm: ', alarm);
    let ackModal = this.modalService.open(AckModalComponent,
      { size: 'lg', centered: true }
    );
    ackModal.componentInstance.alarm = alarm;
    return ackModal;
  }

}
