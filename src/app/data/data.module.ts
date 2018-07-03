import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmService } from './alarm.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataModule,
    AlarmService,
  ],
  providers: []
})
export class DataModule { }
