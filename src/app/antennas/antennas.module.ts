import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntennasComponent } from './antennas/antennas.component';
import { AntennasMapComponent } from './antennas-map/antennas-map.component';
import { AntennasSidebarComponent } from './antennas-sidebar/antennas-sidebar.component';
import { DataModule } from '../data/data.module';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { MapModule } from '../map/map.module';
import { AntennasService } from './antennas.service';


@NgModule({
  imports: [
    CommonModule,
    DataModule,
    IasMaterialModule,
    MapModule,
  ],
  providers: [
    AntennasService
  ],
  declarations: [
    AntennasComponent,
    AntennasMapComponent,
    AntennasSidebarComponent
  ]
})
export class AntennasModule { }
