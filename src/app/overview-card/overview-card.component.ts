import { Component, OnInit } from '@angular/core';

/**
 * Reusable Card to show the summarized state of the subsystems in
 * the overview
 */
@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.css']
})
export class OverviewCardComponent implements OnInit {

  /** Builds an instance of the component */
  constructor() { }

  /** Instantiates the component */
  ngOnInit() {
  }

}
