import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { WeatherSummaryComponent } from './weather-summary/weather-summary.component';
import { WeatherMapComponent } from './weather-map/weather-map.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherSidebarComponent } from './weather-sidebar/weather-sidebar.component';
import { WeatherService } from './weather.service';

import { WeatherTestWSMarkerComponent } from './weather-map/weather-map.component';
import { WeatherTestWSDataComponent } from './weather-map/weather-map.component';


/**
* This module contains all the components related to the Weather system
*/
@NgModule({
  imports: [
    CommonModule,
    DataModule,
    SharedModule,
    IasMaterialModule,
  ],
  providers: [
    WeatherService
  ],
  declarations: [
    WeatherSummaryComponent,
    WeatherMapComponent,
    WeatherComponent,
    WeatherSidebarComponent,
    WeatherTestWSMarkerComponent,
    WeatherTestWSDataComponent,
  ],
  exports: [
    WeatherSummaryComponent,
  ]
})
export class WeatherModule { }
