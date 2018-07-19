import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { ActionsModule } from '../actions/actions.module';
import { SharedModule } from '../shared/shared.module';
import { LegendComponent } from './legend/legend.component';
import { StatusViewComponent } from '../shared/status-view/status-view.component';
import { TabularViewComponent } from './tabular-view/tabular-view.component';

/**
* This module contains all the components related to the Table view
*/
@NgModule({
  imports: [
    CommonModule,
    ActionsModule,
    IasMaterialModule,
    SharedModule
  ],
  declarations: [
    LegendComponent,
    TabularViewComponent,
  ],
  exports: [
    TabularViewComponent,
  ],
  // entryComponents: [
  //   StatusViewComponent,
  // ]
})
export class TabularModule { }
