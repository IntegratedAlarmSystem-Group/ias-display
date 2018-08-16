import { Component, OnInit, Input, Output } from '@angular/core';
import { Alarm, Value, OperationalMode } from '../../../data/alarm';
import { AlarmService } from '../../../data/alarm.service';
import { InfomapOneService } from '../../../infomap-one/infomap-one.service';


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
  styleUrls: ['./antenna-marker.component.css']
})
export class AntennaMarkerComponent implements OnInit {

  @Input() alarm: Alarm;

  @Input() fillColors: AlarmColorsSet;
  @Input() fillColorsUnreliable: AlarmColorsSet;

  @Input() borderColors: AlarmColorsSet;
  @Input() borderColorsUnreliable: AlarmColorsSet;

  @Input() placemark = 'name';

  @Input() cx = 0;
  @Input() cy = 0;
  @Input() r = 1;

  constructor(
    public service: InfomapOneService,
    public alarmService: AlarmService,
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.defineAlarmColors();
  }

  getColors() {

    const colors = {
      'fillColor': 'transparent',
      'borderColor': 'transparent',
    };

    if (!this.alarm) {
      colors['fillColor'] = this.fillColorsUnreliable.unknown;
      colors['borderColor'] = this.borderColorsUnreliable.unknown;
      return colors;
    }
    let fillColorsToUse = this.fillColors;
    let borderColorsToUse = this.borderColors;
    if (this.alarm.validity === 0) {
      fillColorsToUse = this.fillColorsUnreliable;
      borderColorsToUse = this.borderColorsUnreliable;
    }
    if (this.alarm.shelved === true) {
      colors['fillColor'] = fillColorsToUse.shelved;
      colors['borderColor'] = borderColorsToUse.shelved;
      return colors;
    } else if (this.alarm.mode === OperationalMode.unknown) {
      colors['fillColor'] = fillColorsToUse.unknown;
      colors['borderColor'] = borderColorsToUse.unknown;
      return colors;
    } else if (this.alarm.mode === OperationalMode.maintenance || this.alarm.mode === OperationalMode.shuttedown) {
      colors['fillColor'] = fillColorsToUse.maintenance;
      colors['borderColor'] = borderColorsToUse.maintenance;
      return colors;
    } else if (this.alarm.value === Value.cleared) {
      colors['fillColor'] = fillColorsToUse.clear;
      colors['borderColor'] = borderColorsToUse.clear;
      return colors;
    } else if (this.alarm.value === Value.set_low) {
      colors['fillColor'] = fillColorsToUse.set_low;
      colors['borderColor'] = borderColorsToUse.set_low;
      return colors;
    } else if (this.alarm.value === Value.set_medium) {
      colors['fillColor'] = fillColorsToUse.set_medium;
      colors['borderColor'] = borderColorsToUse.set_medium;
      return colors;
    } else if (this.alarm.value === Value.set_high) {
      colors['fillColor'] = fillColorsToUse.set_high;
      colors['borderColor'] = borderColorsToUse.set_high;
      return colors;
    } else if (this.alarm.value === Value.set_critical) {
      colors['fillColor'] = fillColorsToUse.set_critical;
      colors['borderColor'] = borderColorsToUse.set_critical;
      return colors;
    } else {
      colors['fillColor'] = fillColorsToUse.unknown;
      colors['borderColor'] = borderColorsToUse.unknown;
      return colors;
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
