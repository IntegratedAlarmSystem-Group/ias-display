import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AlarmService } from '../../../data/alarm.service';
import { Alarm } from '../../../data/alarm';
import { AlarmConfig } from '../../../data/alarm-config';
import { WeatherService } from '../../weather.service';

/**
 * Marker to display primary weather station in a map
 */
@Component({
  selector: 'app-weather-primary-ws-marker',
  templateUrl: './weather-primary-ws-marker.component.html',
  styleUrls: ['./weather-primary-ws-marker.component.scss']
})
export class WeatherPrimaryWsMarkerComponent implements OnInit {

  /** ID of the Alarm */
  public alarmId: string;

  /** Station config related to the component */
  @Input() stationConfig: AlarmConfig;

  /** Event emitted to notify when the alarm should start or stop blinking */
  @Output() blinkingStatus = new EventEmitter<boolean>();

  /**
  * Builds an instance of the component
  * @param {WeatherService} weatherService Service used to get the configuration needed by the component
  * @param {AlarmService} alarmService Service used to get the Alarms
   */
  constructor(
    public weatherService: WeatherService,
    public alarmService: AlarmService,
  ) { }

  /**
   * Executed after the component is instantiated.
   */
  ngOnInit() {
  }

  /**
  * Function executed to propagate the blinking state according to a boolean parameter
  * It is executed when the inner {@link AlarmComponent} emits a value on its
  * {@link AlarmComponent#blinkingStatus} {@link EventEmitter}
  * @param {boolean} blinking true if it should blink, false if not
  */
  public propagateBlinkingState(blinking: boolean) {
    this.blinkingStatus.emit(blinking);
  }

  /**
  * Finds and returns an {@link Alarm} by ID in the {@link AlarmService}
  * @returns {Alarm} the {@link Alarm}
  */
  getAlarm(): Alarm {
    return this.alarmService.get(this.stationConfig.alarm_id);
  }

}
