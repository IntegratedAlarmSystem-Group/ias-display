import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { ActionsModule } from '../actions/actions.module';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { MapModule } from '../map/map.module';
import { WeatherSummaryComponent } from './weather-summary/weather-summary.component';
import { WeatherMapComponent } from './weather-map/weather-map.component';
import { WeatherMarkerMapComponent } from './weather-map-markers/weather-marker-map/weather-marker-map.component';
import { WeatherDataMapComponent } from './weather-map-markers/weather-data-map/weather-data-map.component';
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
    ClipboardModule,
    ActionsModule,
    DataModule,
    SharedModule,
    MapModule,
    IasMaterialModule,
  ],
  providers: [
    WeatherService
  ],
  declarations: [
    WeatherSummaryComponent,
    WeatherMapComponent,
    WeatherMarkerMapComponent,
    WeatherDataMapComponent,
    WeatherComponent,
    WeatherSidebarComponent,
    WeatherStationSidebarComponent,
  ],
  exports: [
    WeatherSummaryComponent,
  ]
})
export class WeatherModule { }
