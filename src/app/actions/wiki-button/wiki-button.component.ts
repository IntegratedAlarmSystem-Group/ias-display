import { Component, OnInit, Input } from '@angular/core';

/**
 * Button used to trigger the event to open the documentation of an Alarm
 */
@Component({
  selector: 'app-wiki-button',
  templateUrl: './wiki-button.component.html',
  styleUrls: ['./wiki-button.component.css']
})
export class WikiButtonComponent implements OnInit {

  /**
   * Url of the wiki documentation page
   */
  @Input() url: string;

  /** Builds an instance of the component */
  constructor() { }

  /** Instantiates the component */
  ngOnInit() {
  }
}
