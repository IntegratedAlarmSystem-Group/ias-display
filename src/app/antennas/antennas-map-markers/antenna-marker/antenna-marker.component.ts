import { Component, OnInit, Input, Output } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../../data/alarm';
import { AlarmService } from '../../../data/alarm.service';
import { AntennasService } from '../../../antennas/antennas.service';

/**
 * Set of colors to display the antenna based on its alarm status
 */
export class AlarmColorsSet {

  /** Color to use for the "clear" Alarm value  */
  public clear: string;

  /** Color to use for the "set-low" Alarm value  */
  public set_low: string;

  /** Color to use for the "set-medium" Alarm value  */
  public set_medium: string;

  /** Color to use for the "set-high" Alarm value  */
  public set_high: string;

  /** Color to use for the "set-critical" Alarm value  */
  public set_critical: string;

  /** Color to use for the "unknown" Alarm value  */
  public unknown: string;

  /** Color to use for the "maintenance" Alarm value  */
  public maintenance: string;

  /** Color to use for the "shelved" Alarm value  */
  public shelved: string;

  /**
   * Builds an instance of the color set
   * @param {Object} attributes JSON containing the colors as a dictionary
   */
  constructor(attributes: Object = {}) {
    Object.assign(this, attributes);
  }
}

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

  /** Set of colors to display antennas fill in reliable state */
  fillColors: AlarmColorsSet;

  /** Set of colors to display antennas fill in unreliable state */
  fillColorsUnreliable: AlarmColorsSet;

  /** Set of colors to display antennas border in reliable state */
  borderColors: AlarmColorsSet;

  /** Set of colors to display antennas border in unreliable state */
  borderColorsUnreliable: AlarmColorsSet;

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
   * Initializes the {@link AntennasService} if not already initialized
   * Defines alarms colors by calling the {@link defineAlarmColors}
   */
  ngOnInit() {
    this.defineAlarmColors();
  }

  /**
   * Generates a JSON with the colors to be used
   * @param {string} fillColor the color to be used for fill
   * @param {string} borderColor the color to be used for border
   * @returns {Object} a JSON containing the fillColor and the borderColor
   */
  genColorStyle(fillColor, borderColor) {
    return {
      'fillColor': fillColor,
      'borderColor': borderColor
    };
  }

  /**
   * Returns the colors to be used
   * @returns {Object} a JSON containing the fillColor and the borderColor
   */
  getColors() {

    let fillColor = 'transparent';
    let borderColor = 'transparent';

    if (!this.alarm) {
      fillColor = this.fillColorsUnreliable.unknown;
      borderColor = this.borderColorsUnreliable.unknown;
      return this.genColorStyle(fillColor, borderColor);
    }
    let fillColorsToUse = this.fillColors;
    let borderColorsToUse = this.borderColors;
    if (this.alarm.validity === 0) {
      fillColorsToUse = this.fillColorsUnreliable;
      borderColorsToUse = this.borderColorsUnreliable;
    }
    if (this.alarm.shelved === true) {
      fillColor = fillColorsToUse.shelved;
      borderColor = borderColorsToUse.shelved;
      return this.genColorStyle(fillColor, borderColor);
    } else if (this.alarm.mode === OperationalMode.unknown) {
      fillColor = fillColorsToUse.unknown;
      borderColor = borderColorsToUse.unknown;
      return this.genColorStyle(fillColor, borderColor);
    } else if (this.alarm.mode === OperationalMode.maintenance || this.alarm.mode === OperationalMode.shuttedown) {
      fillColor = fillColorsToUse.maintenance;
      borderColor = borderColorsToUse.maintenance;
      return this.genColorStyle(fillColor, borderColor);
    } else if (this.alarm.value === Value.cleared) {
      fillColor = fillColorsToUse.clear;
      borderColor = borderColorsToUse.clear;
      return this.genColorStyle(fillColor, borderColor);
    } else if (this.alarm.value === Value.set_low) {
      fillColor = fillColorsToUse.set_low;
      borderColor = borderColorsToUse.set_low;
      return this.genColorStyle(fillColor, borderColor);
    } else if (this.alarm.value === Value.set_medium) {
      fillColor = fillColorsToUse.set_medium;
      borderColor = borderColorsToUse.set_medium;
      return this.genColorStyle(fillColor, borderColor);
    } else if (this.alarm.value === Value.set_high) {
      fillColor = fillColorsToUse.set_high;
      borderColor = borderColorsToUse.set_high;
      return this.genColorStyle(fillColor, borderColor);
    } else if (this.alarm.value === Value.set_critical) {
      fillColor = fillColorsToUse.set_critical;
      borderColor = borderColorsToUse.set_critical;
      return this.genColorStyle(fillColor, borderColor);
    } else {
      fillColor = fillColorsToUse.unknown;
      borderColor = borderColorsToUse.unknown;
      return this.genColorStyle(fillColor, borderColor);
    }
  }

  /**
   * Defines colors to be used to display the antennas
   */
  defineAlarmColors() {

    this.fillColors = new AlarmColorsSet({
      clear: '#54c073',
      set_low: '#f0c13e',
      set_medium: '#f0c13e',
      set_high: '#ef3c26',
      set_critical: '#ef3c26',
      unknown: '#2fd0fe',
      maintenance: '#cecece',
      shelved: '#54c073'
    });

    this.fillColorsUnreliable = new AlarmColorsSet({
      clear: 'transparent',
      set_low: 'transparent',
      set_medium: 'transparent',
      set_high: 'transparent',
      set_critical: 'transparent',
      unknown: 'transparent',
      maintenance: 'transparent',
      shelved: 'transparent',
    });

    this.borderColors = new AlarmColorsSet({
      clear: '#95fe96',
      set_low: '#fbd575',
      set_medium: '#fbd575',
      set_high: '#fe6b65',
      set_critical: '#fe6b65',
      unknown: '#6be0fb',
      maintenance: '#e0e2e2',
      shelved: '#95fe96'
    });

    this.borderColorsUnreliable = this.borderColors;

  }

}
