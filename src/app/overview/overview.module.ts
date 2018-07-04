import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { WeatherModule } from '../weather/weather.module';
import { IasHealthOverviewComponent } from './ias-health-overview/ias-health-overview.component';


@NgModule({
  imports: [
    CommonModule,
    IasMaterialModule,
    DataModule,
    SharedModule,
    WeatherModule,
  ],
  declarations: [
    OverviewComponent,
    OverviewCardComponent,
    IasHealthOverviewComponent
  ],
  exports: [
    OverviewComponent,
    OverviewCardComponent,
    IasHealthOverviewComponent
  ]
})
export class OverviewModule { }
