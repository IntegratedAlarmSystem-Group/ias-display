import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoutingService } from './routing.service';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { AckComponent } from '../actions/ack/ack.component';
import { AlarmComponent } from '../shared/alarm/alarm.component';
import { AntennasComponent } from '../antennas/antennas/antennas.component';
import { MaterialSandboxComponent } from '../material-sandbox/material-sandbox.component';
import { OverviewComponent } from '../overview/overview/overview.component';
import { ShelveComponent } from '../actions/shelve/shelve.component';
import { TabularViewComponent } from '../tabular/tabular-view/tabular-view.component';
import { WeatherComponent } from '../weather/weather/weather.component';
import { AuthLoginGuard } from '../auth/auth-login.guard';

/**
* Application routes
*/
export const appRoutes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent , canActivate: [AuthLoginGuard]},
  { path: 'tabular', component: TabularViewComponent , canActivate: [AuthLoginGuard]},
  { path: 'tabular/:filter', component: TabularViewComponent , canActivate: [AuthLoginGuard]},
  { path: 'acknowledge/:alarmID', component: AckComponent, outlet: 'actions', canActivate: [AuthLoginGuard]},
  { path: 'shelve/:alarmID', component: ShelveComponent, outlet: 'actions', canActivate: [AuthLoginGuard]},
  { path: 'weather', component: WeatherComponent, canActivate: [AuthLoginGuard]},
  { path: 'sandbox', component: MaterialSandboxComponent, canActivate: [AuthLoginGuard]},
  { path: 'antennas', component: AntennasComponent, canActivate: [AuthLoginGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    IasMaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- true for debugging purposes only
    )
  ],
  declarations: [
    MaterialSandboxComponent
  ],
  providers: [
    RoutingService
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
