import { Component, OnInit, Input, Output } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../../data/alarm';
import { AlarmService } from '../../../data/alarm.service';
import { AntennasService } from '../../../antennas/antennas.service';


export class AlarmColorsSet {

  public clear: string;
  public set_low: string;
  public set_medium: string;
  public set_high: string;
  public set_critical: string;
  public unknown: string;
  public maintenance: string;
  public shelved: string;

  constructor(attributes: Object = {}) {
    Object.assign(this, attributes);
  }

}

@Component({
  selector: 'app-antenna-marker',
  templateUrl: './antenna-marker.component.html',
  styleUrls: ['./antenna-marker.component.scss']
})
export class AntennaMarkerComponent implements OnInit {

  @Input() alarm: Alarm;
  @Input() placemark = {'name': '', 'opt_cx': 0, 'opt_cy': 0};
  @Input() viewbox = '0 0 10 10';
  @Input() cx = 0;
  @Input() cy = 0;
  @Input() r = 1;

  fillColors: AlarmColorsSet;
  fillColorsUnreliable: AlarmColorsSet;

  borderColors: AlarmColorsSet;
  borderColorsUnreliable: AlarmColorsSet;

  constructor(
    public service: AntennasService,
    public alarmService: AlarmService,
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.defineAlarmColors();
  }

  genColorStyle(fillColor, borderColor) {
    return {
      'fillColor': fillColor,
      'borderColor': borderColor
    };
  }

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

  defineAlarmColors() {

    this.fillColors = new AlarmColorsSet({
      clear: 'green',
      set_low: 'yellow',
      set_medium: 'yellow',
      set_high: 'red',
      set_critical: 'red',
      unknown: 'lightblue',
      maintenance: 'gray',
      shelved: 'DarkCyan'
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

    this.borderColors = this.fillColors;
    this.borderColorsUnreliable = this.fillColors;

  }

}
