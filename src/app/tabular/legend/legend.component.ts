import { Component, OnInit } from '@angular/core';
import { Assets } from '../../settings';

/**
* Component to display the alarm table legend
*/
@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  /** Reference to the icon used to display Alarms in clear and valid states */
  clear_valid = Assets.ICONS + 'clear-valid.svg';

  /** Reference to the icon used to display Alarms in clear and invalid states */
  clear_invalid = Assets.ICONS + 'clear-invalid.svg';

  /** Reference to the icon used to display Alarms in unknown state */
  unknown = Assets.ICONS + 'unknown-valid.svg';

  /** Reference to the icon used to display Alarms in maintenance state */
  maintenance = Assets.ICONS + 'maintenance-valid.svg';

  /** Reference to the icon used to display Alarms in set and valid states */
  set_valid = Assets.ICONS + 'set-valid.svg';

  /** Reference to the icon used to display Alarms in set and invalid states */
  set_invalid = Assets.ICONS + 'set-invalid.svg';

  /** Reference to the icon used to display Alarms with priority zero (clear) */
  priority_0 = Assets.ICONS + 'priority-0.svg';

  /** Reference to the icon used to display Alarms with priority low */
  priority_1 = Assets.ICONS + 'priority-1.svg';

  /** Reference to the icon used to display Alarms with priority medium */
  priority_2 = Assets.ICONS + 'priority-2.svg';

  /** Reference to the icon used to display Alarms with priority high */
  priority_3 = Assets.ICONS + 'priority-3.svg';

  /** Reference to the icon used to display Alarms with priority critical */
  priority_4 = Assets.ICONS + 'priority-4.svg';

  /** Builds an instance of the component */
  constructor() { }

  /** Instantiates the component */
  ngOnInit() {
  }
}
