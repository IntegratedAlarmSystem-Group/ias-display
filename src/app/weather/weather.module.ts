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
import { WeatherComponent } from './weather/weather.component';
import { WeatherSidebarComponent } from './weather-sidebar/weather-sidebar.component';
import { WeatherService } from './weather.service';
import { WeatherStationSidebarComponent } from './weather-station-sidebar/weather-station-sidebar.component';

import {
  WeatherBackupWsMarkerComponent
} from './weather-map-markers/weather-backup-ws-marker/weather-backup-ws-marker.component';
import {
  WeatherPrimaryWsMarkerComponent
} from './weather-map-markers/weather-primary-ws-marker/weather-primary-ws-marker.component';
import {
  WeatherPrimaryWsConnectorComponent
} from './weather-map-markers/weather-primary-ws-connector/weather-primary-ws-connector.component';
import {
  WeatherDataMarkerComponent
} from './weather-map-markers/weather-data-marker/weather-data-marker.component';

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
    WeatherComponent,
    WeatherSidebarComponent,
    WeatherStationSidebarComponent,
    WeatherBackupWsMarkerComponent,
    WeatherDataMarkerComponent,
    WeatherPrimaryWsMarkerComponent,
    WeatherPrimaryWsConnectorComponent,
  ],
  exports: [
    WeatherSummaryComponent,
  ]
})
export class WeatherModule { }
