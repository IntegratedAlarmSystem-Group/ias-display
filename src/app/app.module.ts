import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlarmsListComponent } from './alarms-list/alarms-list.component';
import { AlarmService } from './alarm.service';
import { CdbService } from './cdb.service';

import { NbThemeModule } from '@nebular/theme';
import { NbLayoutModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NbMenuService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuModule } from '@nebular/theme';

import { RouterModule, Routes } from '@angular/router';
import { AlarmsTableComponent } from './alarms-table/alarms-table.component';

import { StatusViewComponent } from './status-view/status-view.component';

import { DatePipe } from '@angular/common';


const appRoutes: Routes = [
  { path: '', redirectTo: 'alarms', pathMatch: 'full' },
  { path:'alarms', component: AlarmsTableComponent }
];

/**
* Application module
*/
@NgModule({
  declarations: [
    AppComponent,
    AlarmsListComponent,
    AlarmsTableComponent,
    StatusViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'alma' }),
    NbLayoutModule,
    NbCardModule,
    RouterModule.forRoot(appRoutes),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    Ng2SmartTableModule
  ],
  providers: [
    HttpClient,
    AlarmService,
    CdbService,
    NbSidebarService,
    NbMenuService,
    { provide: APP_BASE_HREF, useValue: '/' },
    DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    StatusViewComponent
  ]
})
export class AppModule { }
