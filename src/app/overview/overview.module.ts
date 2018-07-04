import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { DataModule } from '../data/data.module';
import { HealthModule } from '../health/health.module';
import { SharedModule } from '../shared/shared.module';
import { WeatherModule } from '../weather/weather.module';
import { OverviewComponent } from './overview/overview.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';

/**
* This module contains the general components associated to the overview.
* It is worth noting that the overview of each system is defined in the module of the system
*/
@NgModule({
  imports: [
    CommonModule,
    IasMaterialModule,
    DataModule,
    HealthModule,
    SharedModule,
    WeatherModule,
  ],
  declarations: [
    OverviewComponent,
    OverviewCardComponent,
  ],
  exports: [
    OverviewComponent,
    OverviewCardComponent
  ]
})
export class OverviewModule { }
