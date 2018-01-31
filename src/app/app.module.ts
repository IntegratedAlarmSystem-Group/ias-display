import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlarmsListComponent } from './alarms-list/alarms-list.component';
import { AlarmService } from './alarm.service';

import { NbThemeModule } from '@nebular/theme';
import { NbLayoutModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbSidebarModule } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';

import { NbMenuService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuModule } from '@nebular/theme';

import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './pages/overview/overview.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path:'overview', component: OverviewComponent },
  { path:'weather', component: AlarmsListComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AlarmsListComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    RouterModule.forRoot(appRoutes),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot()
  ],
  providers: [
    AlarmService,
    NbSidebarService,
    NbMenuService,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
