import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlarmsListComponent } from './alarms-list/alarms-list.component';
import { AlarmService } from './alarm.service';

@NgModule({
  declarations: [
    AppComponent,
    AlarmsListComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    AlarmService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
