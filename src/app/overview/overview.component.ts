import { Component, OnInit } from '@angular/core';

/**
 * Main view that contains the components to redirect to more specific views
 */
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  /** Builds an instance of the component */
  constructor() { }

  /** Instantiates the component */
  ngOnInit() {
  }

}
