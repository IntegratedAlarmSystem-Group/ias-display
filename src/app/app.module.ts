import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataModule } from './data/data.module';
import { ActionsModule } from './actions/actions.module';
import { AntennasModule } from './antennas/antennas.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthModule } from './auth/auth.module';
import { IasMaterialModule } from './ias-material/ias-material.module';
import { HealthModule } from './health/health.module';
import { MapModule } from './map/map.module';
import { OverviewModule } from './overview/overview.module';
import { SharedModule } from './shared/shared.module';
import { TabularModule } from './tabular/tabular.module';
import { WeatherModule } from './weather/weather.module';
import { AppComponent } from './app.component';

/**
* Application module
*/
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ActionsModule,
    AntennasModule,
    AppRoutingModule,
    AuthModule,
    BrowserModule,
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
