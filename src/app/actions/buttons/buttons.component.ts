import { Component, OnInit, Input } from '@angular/core';
import { Alarm } from '../../data/alarm';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  /**
   * Alarm object  associated to the buttons
   */
  @Input() alarm: Alarm;

  /**
   * Url of the wiki documentation page
   */
  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }
}
