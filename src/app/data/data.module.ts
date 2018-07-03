import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmService } from './alarm.service';
import { CdbService } from './cdb.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AlarmService,
    CdbService,
  ]
})
export class DataModule { }
