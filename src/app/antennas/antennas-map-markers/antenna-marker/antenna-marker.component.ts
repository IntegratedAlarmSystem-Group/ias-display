import { Component, OnInit, Input } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../../data/alarm';
import { AlarmService } from '../../../data/alarm.service';
import { AntennasService } from '../../../antennas/antennas.service';

/**
 * Marker to display an Antenna in a map
 */
@Component({
  selector: 'app-antenna-marker',
  templateUrl: './antenna-marker.component.html',
  styleUrls: ['./antenna-marker.component.scss']
})
export class AntennaMarkerComponent implements OnInit {

  /** The {@link Alarm} to associate to the antenna */
  @Input() alarm: Alarm;

  /** The placemark that describes how to draw the antenna */
  @Input() placemark = {'name': '', 'opt_cx': 0, 'opt_cy': 0};

  /** The placemark that describes how to draw the antenna */
  @Input() viewbox = '0 0 10 10';

  /** The position of the antenna in the X axis */
  @Input() cx = 0;

  /** The position of the antenna in the Y axis */
  @Input() cy = 0;

  /** Radius of the antenna */
  @Input() r = 1;

  /**
   * Builds an instance of the component
   * @param {AntennasService} service Service used to retrieve and handle antennas configuration
   * @param {AlarmService} alarmService Service used to get the Alarms
   */
  constructor(
    public service: AntennasService,
    public alarmService: AlarmService,
  ) { }

  /**
   * Executed after the component is instantiated.
   */
  ngOnInit() {
  }

  /**
   * Returns the CSS class that should be used to draw the marker
   */
  getNgClass() {
    let colorClass = 'green';
    if (this.alarm.shelved === true) {
      colorClass = 'green';
    } else if (this.alarm.mode === OperationalMode.unknown) {
      colorClass = 'blue';
    } else if (this.alarm.showAsMaintenance()) {
      colorClass = 'grey';
    } else if (this.alarm.value === Value.cleared) {
      colorClass = 'green';
    } else if (this.alarm.value === Value.set_low) {
      colorClass = 'yellow';
    } else if (this.alarm.value === Value.set_medium) {
      colorClass = 'yellow';
    } else if (this.alarm.value === Value.set_high) {
      colorClass = 'red';
    } else if (this.alarm.value === Value.set_critical) {
      colorClass = 'red';
    } else {
      colorClass = 'green';
    }

    if (this.alarm.validity === 0) {
      return [colorClass, 'unreliable'];
    } else {
      return [colorClass];
    }
  }
}
