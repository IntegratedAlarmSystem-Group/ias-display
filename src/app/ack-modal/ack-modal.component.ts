import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alarm } from '../alarm';

@Component({
  selector: 'app-ack-modal',
  templateUrl: './ack-modal.component.html',
  styleUrls: ['./ack-modal.component.css', './ack-modal.component.scss']
})
export class AckModalComponent implements OnInit {
  @Input() alarm;


  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
