import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AckComponent } from './ack/ack.component';
import { ShelveComponent } from './shelve/shelve.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { DataModule } from '../data/data.module';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    IasMaterialModule,
    DataModule,
  ],
  declarations: [
    AckComponent,
    ShelveComponent,
  ],
  exports: [
    AckComponent,
    ShelveComponent,
  ]
})
export class ActionsModule { }
