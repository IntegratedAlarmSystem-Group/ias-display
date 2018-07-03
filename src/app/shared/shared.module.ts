import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { AckButtonComponent } from './ack-button/ack-button.component';
import { AlarmComponent } from './alarm/alarm.component';
import { ShelveButtonComponent } from './shelve-button/shelve-button.component';
import { ShelveModalComponent } from './shelve-modal/shelve-modal.component';
import { WikiButtonComponent } from './wiki-button/wiki-button.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    IasMaterialModule,
  ],
  declarations: [
    AckButtonComponent,
    AlarmComponent,
    ShelveButtonComponent,
    ShelveModalComponent,
    WikiButtonComponent,
  ],
  exports: [
    AckButtonComponent,
    AlarmComponent,
    ShelveButtonComponent,
    ShelveModalComponent,
    WikiButtonComponent,
  ],
})
export class SharedModule { }
