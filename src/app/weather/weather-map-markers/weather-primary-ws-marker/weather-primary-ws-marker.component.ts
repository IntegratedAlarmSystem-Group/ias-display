import { Component, OnInit, Input } from '@angular/core';

import { AlarmComponent } from '../../../shared/alarm/alarm.component';
import { AlarmImageSet } from '../../../shared/alarm/alarm.component';
import { AlarmService } from '../../../data/alarm.service';
import { Alarm } from '../../../data/alarm';

import { WeatherService, WeatherStationConfig } from '../../weather.service';

import { Assets } from '../../../settings';

@Component({
  selector: 'app-weather-primary-ws-marker',
  templateUrl: './weather-primary-ws-marker.component.html',
  styleUrls: ['./weather-primary-ws-marker.component.scss']
})
export class WeatherPrimaryWsMarkerComponent implements OnInit {

    /** Set of icons */
    public iconSet: AlarmImageSet;

    /** Set of Unreliable icons */
    public iconUnreliableSet: AlarmImageSet;

    /** ID of the Alarm */
    public alarmId: string;

    /** Placemark name related to the component */
    @Input() placemark;

    /** Local alarm configuration */
    alarmConfig;

    /**
    * Builds an instance of the component
    * @param {WeatherService} weatherService Service used to get the configuration needed by the component
    * @param {AlarmService} alarmService Service used to get the Alarms
     */
    constructor(
      public weatherService: WeatherService,
      public alarmService: AlarmService,
    ) { }


    ngOnInit() {
      this.initialize();
    }

    /**
    * Initialize the component with the related alarm configuration
    *
    * The alarm configuration should be retrieved using the placemark name, to be able
    * to be displayed on the weather map
    */
    initialize () {
      this.alarmConfig = this.getAlarmConfig(this.placemark);
      this.defineAlarmsAndIcons();
    }

    /**
    * Checks if there is a placemark related to the alarm
    */
    alarmHasLocation(placemark) {
      const index = Object.keys(
        this.weatherService.weatherStationsConfig).indexOf(placemark);
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    }

    /**
    * Retrieves the alarm configuration related to the placemark
    */
    getAlarmConfig(placemark) {
      const hasLocation = this.alarmHasLocation(placemark);
      if (hasLocation === true) {
        return this.weatherService
                  .weatherStationsConfig[placemark];
      }
    }

    /**
    * Finds and returns an {@link Alarm} by ID in the {@link AlarmService}
    * @param {string} alarm_id the ID of the {@link Alarm}
    * @returns {Alarm} the {@link Alarm}
    */
    getAlarm(alarm_id: string): Alarm {
      return this.alarmService.get(alarm_id);
    }

    /**
    * Define the alarm that the component should listen to and its icons
    */
    defineAlarmsAndIcons() {

      /** Set of icons */
      this.iconSet = new AlarmImageSet({
        clear: Assets.ICONS + 'weather_s-valid-clear.svg',
        set_low: Assets.ICONS + 'weather_s-valid-medium.svg',
        set_medium: Assets.ICONS + 'weather_s-valid-medium.svg',
        set_high: Assets.ICONS + 'weather_s-valid-critical.svg',
        set_critical: Assets.ICONS + 'weather_s-valid-critical.svg',
        unknown: Assets.ICONS + 'weather_s-valid-unknown.svg',
        maintenance: Assets.ICONS + 'weather_s-valid-maintenance.svg',
        shelved: Assets.ICONS + 'weather_s-valid-clear.svg',
      });

      /** Set of Unreliable icons */
      this.iconUnreliableSet = new AlarmImageSet({
        clear: Assets.ICONS + 'weather_s-invalid-clear.svg',
        set_low: Assets.ICONS + 'weather_s-invalid-medium.svg',
        set_medium: Assets.ICONS + 'weather_s-invalid-medium.svg',
        set_high: Assets.ICONS + 'weather_s-invalid-critical.svg',
        set_critical: Assets.ICONS + 'weather_s-invalid-critical.svg',
        unknown: Assets.ICONS + 'weather_s-invalid-unknown.svg',
        maintenance: Assets.ICONS + 'weather_s-invalid-maintenance.svg',
        shelved: Assets.ICONS + 'weather_s-invalid-clear.svg',
      });
    }

}
