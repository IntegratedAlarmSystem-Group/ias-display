import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css', './weather.component.scss']
})
export class WeatherComponent implements OnInit {

  panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

}
