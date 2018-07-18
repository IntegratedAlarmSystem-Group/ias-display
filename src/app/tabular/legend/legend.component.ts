import { Component, OnInit } from '@angular/core';
import { Assets } from '../../settings';

/**
* Component to display the alarm table legend
*/
@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit {

  /** Builds an instance of the component */
  constructor() { }

  /** Instantiates the component */
  ngOnInit() {
  }

  clear_valid = Assets.ICONS + 'clear-valid.svg';
  clear_invalid = Assets.ICONS + 'clear-invalid.svg';
  unknown = Assets.ICONS + 'unknown-valid.svg';
  maintenance = Assets.ICONS + 'maintenance-valid.svg';
  set_valid = Assets.ICONS + 'set-valid.svg';
  set_invalid = Assets.ICONS + 'set-invalid.svg';
  priority_0 = Assets.ICONS + 'priority-0.svg';
  priority_1 = Assets.ICONS + 'priority-1.svg';
  priority_2 = Assets.ICONS + 'priority-2.svg';
  priority_3 = Assets.ICONS + 'priority-3.svg';
  priority_4 = Assets.ICONS + 'priority-4.svg';
}
