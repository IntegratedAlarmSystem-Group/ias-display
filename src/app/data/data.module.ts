import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmService } from './alarm.service';
import { CdbService } from './cdb.service';
import { HttpClientService } from './http-client.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AlarmService,
    CdbService,
    HttpClientService,
  ]
})
export class DataModule { }
