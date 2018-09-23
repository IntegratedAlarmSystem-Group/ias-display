import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntennasComponent } from './antennas/antennas.component';
import { AntennasMapComponent } from './antennas-map/antennas-map.component';
import { AntennasSidebarComponent } from './antennas-sidebar/antennas-sidebar.component';
import { DataModule } from '../data/data.module';
import { ActionsModule } from '../actions/actions.module';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { MapModule } from '../map/map.module';
import { SharedModule } from '../shared/shared.module';
import { AntennasService } from './antennas.service';
import { AntennaMarkerComponent } from './antennas-map-markers/antenna-marker/antenna-marker.component';
import { AntennasSummaryComponent } from './antennas-summary/antennas-summary.component';


@NgModule({
  imports: [
    CommonModule,
    DataModule,
    ActionsModule,
    IasMaterialModule,
    MapModule,
    SharedModule,
  ],
  providers: [
    AntennasService
  ],
  declarations: [
    AntennasComponent,
    AntennasMapComponent,
    AntennasSidebarComponent,
    AntennaMarkerComponent,
    AntennasSummaryComponent
  ],
  exports: [
    AntennasSummaryComponent
  ]
})
export class AntennasModule { }
