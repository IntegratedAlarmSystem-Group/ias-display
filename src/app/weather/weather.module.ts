import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { WeatherSummaryComponent } from './weather-summary/weather-summary.component';

@NgModule({
  imports: [
    CommonModule,
    DataModule,
    SharedModule,
  ],
  declarations: [
    WeatherSummaryComponent,
  ],
  exports: [
    WeatherSummaryComponent,
  ]
})
export class WeatherModule { }
