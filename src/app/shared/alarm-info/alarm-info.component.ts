import { Component, OnInit, Input } from '@angular/core';
import { Alarm} from '../../data/alarm';
import { Locale } from '../../settings';

/**
 * Component used to display general information about an alarm
 */
@Component({
  selector: 'app-alarm-info',
  templateUrl: './alarm-info.component.html',
  styleUrls: ['./alarm-info.component.scss']
})
export class AlarmInfoComponent implements OnInit {

  /**
  * Alarm object associated to the component
  */
  @Input() alarm: Alarm;

  /** String to store the formatting of dates, read form the settings */
  private dateFormat: string;

  /** String to store the timezone to display dates, read from the settings */
  private timezone: string;

  /**
   * Builds an instance of the component
   */
  constructor() { }

  /**
   * Method executed when the component is initiated
   */
  ngOnInit() {
    this.dateFormat = Locale.DATE_FORMAT;
    this.timezone = Locale.TIMEZONE;
  }

}
