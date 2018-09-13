import { Component, OnInit } from '@angular/core';

/**
* Component that displays some Angular Material Elements.
* Useful to check how the application would look if it includes those elements
*/
@Component({
  selector: 'app-material-sandbox',
  templateUrl: './material-sandbox.component.html',
  styleUrls: ['./material-sandbox.component.scss']
})
export class MaterialSandboxComponent implements OnInit {

  /**
  * Constructor of the component
  */
  constructor() { }

  /**
  * Executed when initiating the component
  */
  ngOnInit() {
  }

}
