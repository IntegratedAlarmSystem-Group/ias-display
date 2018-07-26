import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AckComponent } from './ack/ack.component';
import { ShelveComponent } from './shelve/shelve.component';
import { AckButtonComponent } from './ack-button/ack-button.component';
import { ShelveButtonComponent } from './shelve-button/shelve-button.component';
import { AckTreeComponent } from './ack-tree/ack-tree.component';
import { AlarmComponent } from '../shared/alarm/alarm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { DataModule } from '../data/data.module';
import { SharedModule } from '../shared/shared.module';
import { SidenavService } from './sidenav.service';
import { ButtonsComponent } from './buttons/buttons.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    IasMaterialModule,
    DataModule,
    SharedModule,
  ],
  declarations: [
    AckComponent,
    ShelveComponent,
    AckButtonComponent,
    ShelveButtonComponent,
    AckTreeComponent,
    ButtonsComponent,
  ],
  providers: [
    SidenavService,
  ],
  exports: [
    AckComponent,
    ShelveComponent,
    AckButtonComponent,
    ShelveButtonComponent,
  ]
})
export class ActionsModule { }
