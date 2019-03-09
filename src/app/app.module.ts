import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    IasMaterialModule,
    DataModule,
    HealthModule,
    OverviewModule,
    SharedModule,
    TabularModule,
    WeatherModule,
    MapModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
