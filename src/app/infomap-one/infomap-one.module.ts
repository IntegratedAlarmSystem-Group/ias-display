import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfomapOneComponent } from './infomap-one/infomap-one.component';
import { InfomapOneMapComponent } from './infomap-one-map/infomap-one-map.component';
import { InfomapOneSidebarComponent } from './infomap-one-sidebar/infomap-one-sidebar.component';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { MapModule } from '../map/map.module';
import { MapService } from '../map/map.service';
import { AntennaMarkerComponent } from './infomap-one-map-markers/antenna-marker/antenna-marker.component';


@NgModule({
  imports: [
    CommonModule,
    IasMaterialModule,
    MapModule
  ],
  declarations: [
    InfomapOneComponent,
    InfomapOneMapComponent,
    InfomapOneSidebarComponent,
    AntennaMarkerComponent,
  ],
  providers: [
    MapService
  ],
  exports: [
    InfomapOneComponent
  ]
})
export class InfomapOneModule { }
