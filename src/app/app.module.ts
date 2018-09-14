import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IasMaterialModule } from './ias-material/ias-material.module';
import { DataModule } from './data/data.module';
import { ActionsModule } from './actions/actions.module';
import { HealthModule } from './health/health.module';
import { OverviewModule } from './overview/overview.module';
import { SharedModule } from './shared/shared.module';
import { TabularModule } from './tabular/tabular.module';
import { WeatherModule } from './weather/weather.module';
import { MapModule } from './map/map.module';
import { AntennasModule } from './antennas/antennas.module';
import { AppComponent } from './app.component';
import { TabularViewComponent } from './tabular/tabular-view/tabular-view.component';
import { OverviewComponent } from './overview/overview/overview.component';
import { AckComponent } from './actions/ack/ack.component';
import { ShelveComponent } from './actions/shelve/shelve.component';
import { WeatherComponent } from './weather/weather/weather.component';
import { AlarmComponent } from './shared/alarm/alarm.component';
import { AntennasComponent } from './antennas/antennas/antennas.component';

import { HttpModule } from '@angular/http';
import { MaterialSandboxComponent } from './material-sandbox/material-sandbox.component';

/**
* Application routes
*/
export const appRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'tabular', component: TabularViewComponent },
  { path: 'tabular/:filter', component: TabularViewComponent },
  { path: 'acknowledge/:alarmID', component: AckComponent, outlet: 'actions'},
  { path: 'shelve/:alarmID', component: ShelveComponent, outlet: 'actions'},
  { path: 'weather', component: WeatherComponent},
  { path: 'sandbox', component: MaterialSandboxComponent},
  { path: 'antennas', component: AntennasComponent},
];

/**
* Application module
*/
@NgModule({
  declarations: [
    AppComponent,
    MaterialSandboxComponent,
  ],
  imports: [
    ActionsModule,
    AntennasModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    IasMaterialModule,
    NgxSpinnerModule,
    DataModule,
    HealthModule,
    OverviewModule,
    SharedModule,
    TabularModule,
    WeatherModule,
    HttpModule,
    MapModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
