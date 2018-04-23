import { Component, OnInit } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ack-modal',
  templateUrl: './ack-modal.component.html',
  styleUrls: ['./ack-modal.component.css']
})
export class AckModalComponent implements OnInit {


  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
