import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { DataModule } from '../data/data.module';
import { AckButtonComponent } from './ack-button/ack-button.component';
import { AlarmComponent } from './alarm/alarm.component';
import { ShelveButtonComponent } from './shelve-button/shelve-button.component';
import { WikiButtonComponent } from './wiki-button/wiki-button.component';
import { ActionsModule } from '../actions/actions.module';

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
  ],
  declarations: [
    AckButtonComponent,
    AlarmComponent,
    ShelveButtonComponent,
    WikiButtonComponent,
  ],
  exports: [
    AckButtonComponent,
    AlarmComponent,
    ShelveButtonComponent,
    WikiButtonComponent,
  ],
  entryComponents: [
    AlarmComponent,
  ]
})
export class SharedModule { }
