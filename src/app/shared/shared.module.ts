import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { AckButtonComponent } from './ack-button/ack-button.component';
import { AlarmComponent } from './alarm/alarm.component';
import { ShelveButtonComponent } from './shelve-button/shelve-button.component';
import { WikiButtonComponent } from './wiki-button/wiki-button.component';

@NgModule({
  imports: [
    CommonModule,
    IasMaterialModule,
  ],
  declarations: [
    AckButtonComponent,
    AlarmComponent,
    ShelveButtonComponent,
    WikiButtonComponent,
  ],
  exports: [
    AckButtonComponent,
    AlarmComponent,
    ShelveButtonComponent,
    WikiButtonComponent,
  ],
})
export class SharedModule { }
