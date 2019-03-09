import { Component, OnInit } from '@angular/core';

/**
* Component that dispays all the Alarms in a table using the {@link TableComponent}
*/
@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.scss']
})
export class TabularViewComponent implements OnInit {

  /**
   * Instantiates the component
   */
  constructor() { }

  /**
   * Method executed when the Component is initializated
   * Does not do anything at the moment
   */
  ngOnInit() {
  }

}
