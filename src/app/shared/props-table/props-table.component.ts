import { Component, OnInit, Input } from '@angular/core';
import { Alarm} from '../../data/alarm';

/**
 * Component used to display the properties of an alarm
 */
@Component({
  selector: 'app-props-table',
  templateUrl: './props-table.component.html',
  styleUrls: ['./props-table.component.css']
})
export class PropsTableComponent implements OnInit {

  /**
  * Alarm object associated to the component
  */
  @Input() alarm: Alarm;

  /**
   * Builds an instance of the component
   */
  constructor() { }

  /**
   * Method executed when the component is initiated
   */
  ngOnInit() {
  }

}
