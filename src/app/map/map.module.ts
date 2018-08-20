import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MapService } from './map.service';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MapComponent,
  ],
  providers: [
    MapService
  ],
  exports: [
    MapComponent,
  ]
})
export class MapModule { }
