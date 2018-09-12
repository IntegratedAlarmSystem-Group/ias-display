import { Component, OnInit } from '@angular/core';
import { AntennaConfig } from '../antennas.service';

/**
* Component used to display Antennas Alarms both in a sidebar (instantiated in a {@link AntennasSidebar}),
* and a map (instantiated by a {@link AntennasMap})
*/
@Component({
  selector: 'app-antennas',
  templateUrl: './antennas.component.html',
  styleUrls: ['./antennas.component.scss']
})
export class AntennasComponent implements OnInit {

  /** Selected placemark name from the inner map or inner components */
  selectedAntenna: AntennaConfig = null;

  /**
   * Builds an instance of the component
   */
  constructor() { }

  /**
   * Executed after the component is instantiated
   */
  ngOnInit() {
  }

  /** Update selected placemark name using events emitted from internal components
   * @param {AntennaConfig}
   */
  updateSelectedAntenna(selectedAntenna: AntennaConfig): void {
    this.selectedAntenna = selectedAntenna;
  }

}
