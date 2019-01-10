import { Component, OnInit } from '@angular/core';
import { AlarmConfig } from '../../data/alarm-config';

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
  selectedAntenna: AlarmConfig = null;

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
   * @param {AlarmConfig}
   */
  updateSelectedAntenna(selectedAntenna: AlarmConfig): void {
    this.selectedAntenna = selectedAntenna;
  }

}
