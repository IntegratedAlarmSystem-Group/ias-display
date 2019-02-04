import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { DataModule } from '../data/data.module';
import { AlarmComponent } from './alarm/alarm.component';
import { StatusViewComponent } from './status-view/status-view.component';
import { AlarmHeaderComponent } from './alarm-header/alarm-header.component';

/**
* This module contains all the shared components, that are meant to be used bty the other modules.
* For example:
 * - Acknowledge and shelve components
 * - Acknowledge, shelve and action buttons
 * - Alarm components
*/
@NgModule({
  imports: [
    CommonModule,
    DataModule,
    IasMaterialModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    AlarmComponent,
    StatusViewComponent,
    AlarmHeaderComponent,
  ],
  exports: [
    AlarmComponent,
    StatusViewComponent,
    AlarmHeaderComponent,
  ],
  entryComponents: [
    AlarmComponent,
    StatusViewComponent,
    AlarmHeaderComponent,
  ]
})
export class SharedModule { }
