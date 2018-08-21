import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-antennas',
  templateUrl: './antennas.component.html',
  styleUrls: ['./antennas.component.scss']
})
export class AntennasComponent implements OnInit {

  /** Selected placemark name from the inner map or inner components */
  selectedAntenna = '';

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
  updateSelectedAntenna(selectedAntennaMarker: string) {
    this.selectedAntenna = selectedAntennaMarker;
  }

}
