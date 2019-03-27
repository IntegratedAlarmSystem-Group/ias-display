import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { BuildingSummaryComponent } from './building-summary/building-summary.component';

@NgModule({
  declarations: [
    BuildingSummaryComponent
  ],
  exports: [
    BuildingSummaryComponent
  ],
  imports: [
    CommonModule,
    DataModule,
    IasMaterialModule,
    SharedModule
  ]
})
export class BuildingModule { }
