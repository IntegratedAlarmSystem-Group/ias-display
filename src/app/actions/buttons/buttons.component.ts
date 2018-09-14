import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../../data/alarm';

/**
 * Set of buttons used to trigger actions over AlarmService
 * Contains the following subcomponents: AckButtonComponent, ShelveButtonComponent, WikButtonComponent
 */
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  /**
   * Alarm object associated to the buttons
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
