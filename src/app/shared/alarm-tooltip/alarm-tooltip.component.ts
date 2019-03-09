import { Component, Input, OnInit } from '@angular/core';
import { Alarm } from '../../data/alarm';
import { Locale } from '../../settings';

/**
* Component that defines the content and layout of the tooltip over Alarm Components
* In order to use it you have to put the {@link AlarmTooltipComponent} inside an ng-template
* and assign the ng-template to the main container of the parent component with some additional paramenters,
* such as data-container="body".
*
* For example:
*
* <div
*   placement="'right'"
*   [ngbTooltip]="tipContent"
*   data-container="body"
* >
*   <ng-template #tipContent>
*     <app-alarm-tooltip [alarm]="alarmObject" [tooltipDirection]="'left'"></app-alarm-tooltip>
*   </ng-template>
**/
@Component({
  selector: 'app-alarm-tooltip',
  templateUrl: './alarm-tooltip.component.html',
  styleUrls: ['./alarm-tooltip.component.scss']
})
export class AlarmTooltipComponent implements OnInit {

  /**
   * Alarm object associated to the component
   */
  @Input() alarm: Alarm;

  /**
   * Defines the direction of the tooltip
   */
  @Input() tooltipDirection = 'right';

  /** String to store the formatting of dates, read form the settings */
  dateFormat: string;

  /** String to store the timezone to display dates, read from the settings */
  timezone: string;

  /**
  * Instantiates the component
  */
  constructor() { }

  /**
  * Executed when the component is initiating
  * Initializes the dateFormat and timezone
  */
  ngOnInit() {
    this.dateFormat = Locale.DATE_FORMAT;
    this.timezone = Locale.TIMEZONE;
  }

}
