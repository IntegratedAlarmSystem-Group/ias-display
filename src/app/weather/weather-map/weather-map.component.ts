import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../data/alarm.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent implements OnInit {

  constructor(
    public weatherService: WeatherService,
    public alarmService: AlarmService,
  ) { }

  ngOnInit() {
  }

}
