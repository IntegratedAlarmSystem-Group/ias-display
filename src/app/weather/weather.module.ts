import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsModule } from '../actions/actions.module';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { WeatherSummaryComponent } from './weather-summary/weather-summary.component';
import { WeatherMapComponent } from './weather-map/weather-map.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherSidebarComponent } from './weather-sidebar/weather-sidebar.component';
import { WeatherService } from './weather.service';
import { WeatherStationSidebarComponent } from './weather-station-sidebar/weather-station-sidebar.component';


/**
* This module contains all the components related to the Weather system
*/
@NgModule({
  imports: [
    CommonModule,
    ActionsModule,
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
    WeatherStationSidebarComponent,
  ],
  exports: [
    WeatherSummaryComponent,
  ]
})
export class WeatherModule { }
