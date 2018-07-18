import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { WeatherSummaryComponent } from './weather-summary/weather-summary.component';
import { WeatherMapComponent } from './weather-map/weather-map.component';
import { WeatherPanelComponent } from './weather-panel/weather-panel.component';
import { WeatherSidebarComponent } from './weather-sidebar/weather-sidebar.component';

/**
* This module contains all the components related to the Weather system
*/
@NgModule({
  imports: [
    CommonModule,
    DataModule,
    SharedModule,
  ],
  declarations: [
    WeatherSummaryComponent,
    WeatherMapComponent,
    WeatherPanelComponent,
    WeatherSidebarComponent,
  ],
  exports: [
    WeatherSummaryComponent,
  ]
})
export class WeatherModule { }
