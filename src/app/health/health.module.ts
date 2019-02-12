import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { HealthSummaryComponent } from './health-summary/health-summary.component';
import { IasMaterialModule } from '../ias-material/ias-material.module';


/**
* This module contains the components associated to the health of the IAS
*/
@NgModule({
  imports: [
    CommonModule,
    DataModule,
    IasMaterialModule,
    SharedModule
  ],
  declarations: [
    HealthSummaryComponent
  ],
  exports: [
    HealthSummaryComponent
  ]
})
export class HealthModule { }
