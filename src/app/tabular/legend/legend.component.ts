import { Component, OnInit } from '@angular/core';
import { Assets } from '../../settings';

/**
* Component to display the alarm table legend
*/
@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css', './legend.component.scss']
})
export class LegendComponent implements OnInit {

  /** Builds an instance of the component */
  constructor() { }

  /** Instantiates the component */
  ngOnInit() {
  }

  clear_valid = Assets.ICONS + 'clear-valid.svg';
  clear_invalid = Assets.ICONS + 'clear-invalid.svg';
  set_valid = Assets.ICONS + 'set-valid.svg';
  set_invalid = Assets.ICONS + 'set-invalid.svg';
  priority_low = Assets.ICONS + 'priority_0.svg';
  priority_medium = Assets.ICONS + 'priority_1.svg';
  priority_high = Assets.ICONS + 'priority_2.svg';
  priority_critical = Assets.ICONS + 'priority_3.svg';

}
