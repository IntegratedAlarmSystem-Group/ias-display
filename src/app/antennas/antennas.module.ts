import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntennasComponent } from './antennas/antennas.component';
import { AntennasMapComponent } from './antennas-map/antennas-map.component';
import { AntennasSidebarComponent } from './antennas-sidebar/antennas-sidebar.component';
import { DataModule } from '../data/data.module';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { MapModule } from '../map/map.module';
import { SharedModule } from '../shared/shared.module';
import { AntennasService } from './antennas.service';
import { AntennaMarkerComponent } from './antennas-map-markers/antenna-marker/antenna-marker.component';
import { AntennasSidebarListComponent } from './antennas-sidebar-list/antennas-sidebar-list.component';


@NgModule({
  imports: [
    CommonModule,
    DataModule,
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
    AntennasSidebarListComponent
  ]
})
export class AntennasModule { }
