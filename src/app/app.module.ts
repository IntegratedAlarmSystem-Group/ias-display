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
import { DataModule } from './data/data.module';
import { OverviewModule } from './overview/overview.module';
import { SharedModule } from './shared/shared.module';
import { TabularModule } from './tabular/tabular.module';
import { AppComponent } from './app.component';
import { TabularViewComponent } from './tabular/tabular-view/tabular-view.component';
import { OverviewComponent } from './overview/overview/overview.component';
import { OverviewWeatherCardContentComponent } from './overview/overview-weather-card-content/overview-weather-card-content.component';
import { IasHealthOverviewComponent } from './overview/ias-health-overview/ias-health-overview.component';


/**
* Application routes
*/
export const appRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'tabular', component: TabularViewComponent },
  { path: 'tabular/:filter', component: TabularViewComponent },
];

/**
* Application module
*/
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IasMaterialModule,
    NgxSpinnerModule,
    DataModule,
    OverviewModule,
    SharedModule,
    TabularModule,
  ],
  providers: [
    HttpClient,
    { provide: APP_BASE_HREF, useValue: '/' },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
