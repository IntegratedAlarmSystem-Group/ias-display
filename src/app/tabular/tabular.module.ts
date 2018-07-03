import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { SharedModule } from '../shared/shared.module';
import { LegendComponent } from './legend/legend.component';
import { StatusViewComponent } from './status-view/status-view.component';
import { TabularViewComponent } from './tabular-view/tabular-view.component';

@NgModule({
  imports: [
    CommonModule,
    IasMaterialModule,
    SharedModule
  ],
  declarations: [
    LegendComponent,
    StatusViewComponent,
    TabularViewComponent,
  ],
  exports: [
    TabularViewComponent,
  ],
  entryComponents: [
    StatusViewComponent,
  ]
})
export class TabularModule { }
