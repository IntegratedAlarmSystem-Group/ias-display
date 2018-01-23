import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlarmsListComponent } from './alarms-list/alarms-list.component';
import { AlarmService } from './alarm.service';

import { NbThemeModule } from '@nebular/theme';
import { NbLayoutModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
// import { NbCardBodyComponent, NbCardFooterComponent, NbCardHeaderComponent}

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path:'', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlarmsListComponent
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AlarmService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
