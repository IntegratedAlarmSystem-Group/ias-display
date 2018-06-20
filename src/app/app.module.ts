import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IasMaterialModule } from './ias-material/ias-material.module';

import { NbThemeModule } from '@nebular/theme';

import { RoutingService} from './routing.service';
import { HttpClientService } from './http-client.service';
import { AlarmService } from './alarm.service';
import { CdbService } from './cdb.service';
import { AppComponent } from './app.component';
import { StatusViewComponent } from './status-view/status-view.component';
import { TabularViewComponent } from './tabular-view/tabular-view.component';
import { AckModalComponent } from './ack-modal/ack-modal.component';
import { OverviewComponent } from './overview/overview.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { OverviewWeatherCardContentComponent } from './overview-weather-card-content/overview-weather-card-content.component';
import { AckButtonComponent } from './ack-button/ack-button.component';
import { WikiButtonComponent } from './wiki-button/wiki-button.component';
import { LegendComponent } from './legend/legend.component';


/**
* Application routes
*/
export const appRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'tabular', component: TabularViewComponent },
  { path: 'tabular/:filter', component: TabularViewComponent },
  { path: 'modal', component: AckModalComponent }
];

/**
* Application module
*/
@NgModule({
  declarations: [
    AppComponent,
    StatusViewComponent,
    AckModalComponent,
    TabularViewComponent,
    OverviewComponent,
    OverviewCardComponent,
    OverviewWeatherCardContentComponent,
    AckButtonComponent,
    WikiButtonComponent,
    LegendComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'alma' }),
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IasMaterialModule,
    NgxSpinnerModule
  ],
  providers: [
    HttpClientService,
    HttpClient,
    AlarmService,
    CdbService,
    RoutingService,
    { provide: APP_BASE_HREF, useValue: '/' },
    DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    StatusViewComponent,
    AckModalComponent,
  ]
})
export class AppModule { }
