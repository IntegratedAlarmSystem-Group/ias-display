import { Component, Input, OnInit } from '@angular/core';
import { TabularModule } from '../../tabular/tabular.module';
import { AlarmComponent, AlarmImageSet } from '../../shared/alarm/alarm.component';
import { Observable, BehaviorSubject , SubscriptionLike as ISubscription } from 'rxjs';
import { AlarmService } from '../../data/alarm.service';
import { Alarm } from '../../data/alarm';
import { WeatherService } from '../weather.service';
import { Assets } from '../../settings';

@Component({
  selector: 'app-weather-sidebar',
  templateUrl: './weather-sidebar.component.html',
  styleUrls: ['./weather-sidebar.component.css', './weather-sidebar.component.scss']
})
export class WeatherSidebarComponent implements OnInit {

  /** Dictionary of Weather Alarms indexed by alarm_id **/
  @Input() alarms: {[core_id: string]: Alarm };

  /**
   * Builds an instance of the component
   * @param {WeatherService} weatherService Service used to get the Alarms
   */
  constructor(
    public weatherService: WeatherService,
  ) { }

  ngOnInit() {
    console.log('Weather Sidebar, alarms = ', this.alarms);
    console.log('Weather Sidebar, weatherService.alarmsIds = ', this.weatherService.alarmsIds);
  }

  getAlarm(alarm_id): Alarm {
    return this.alarms[alarm_id];
  }
}
