import { Component, OnInit } from '@angular/core';
import { AntennaConfig } from '../antennas.service';

@Component({
  selector: 'app-antennas',
  templateUrl: './antennas.component.html',
  styleUrls: ['./antennas.component.scss']
})
export class AntennasComponent implements OnInit {

  /** Selected placemark name from the inner map or inner components */
  selectedAntenna = null;

  /**
   * Builds an instance of the component
   */
  constructor() { }

  /**
   * Executed after the component is instantiated
   */
  ngOnInit() {
  }

  /** Update selected placemark name using events emitted from internal components  */
  updateSelectedAntenna(selectedAntenna: AntennaConfig) {
    this.selectedAntenna = selectedAntenna;
  }

}
