import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlarmsListComponent } from './alarms-list/alarms-list.component';
import { AlarmService } from './alarm.service';
import { CdbService } from './cdb.service';
import { HttpClientService } from './http-client.service';

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
import { AckModalComponent } from './ack-modal/ack-modal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabularViewComponent, ElementService } from './tabular-view/tabular-view.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
         MatSortModule, MatTableModule } from "@angular/material";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: '', redirectTo: 'alarms', pathMatch: 'full' },
  { path:'alarms', component: AlarmsTableComponent },
  { path:'tabular', component: TabularViewComponent },
  { path:'modal', component: AckModalComponent }
];

/**
* Application module
*/
@NgModule({
  declarations: [
    AppComponent,
    AlarmsListComponent,
    AlarmsTableComponent,
    StatusViewComponent,
    AckModalComponent,
    TabularViewComponent,
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
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [
    HttpClientService,
    HttpClient,
    AlarmService,
    CdbService,
    NbSidebarService,
    NbMenuService,
    { provide: APP_BASE_HREF, useValue: '/' },
    DatePipe,
    ElementService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    StatusViewComponent,
    AckModalComponent,
  ]
})
export class AppModule { }
