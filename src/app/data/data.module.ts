import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlarmService } from './alarm.service';
import { CdbService } from './cdb.service';
import { HttpClientService } from './http-client.service';
import { RoutingService } from './routing.service';


/**
* This module contains all the services and data models
*/
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AlarmService,
    CdbService,
    HttpClient,
    HttpClientService,
    RoutingService,
  ],
  exports: [
    HttpClientModule
  ]
})
export class DataModule { }
