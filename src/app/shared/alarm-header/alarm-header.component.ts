import { Component, OnInit, Input } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../data/alarm';

@Component({
  selector: 'app-alarm-header',
  templateUrl: './alarm-header.component.html',
  styleUrls: ['./alarm-header.component.scss']
})
export class AlarmHeaderComponent implements OnInit {

  /**
  * Alarm object associated to the component
  */
  @Input() alarm: Alarm;

  constructor() { }

  ngOnInit() {
  }

}
