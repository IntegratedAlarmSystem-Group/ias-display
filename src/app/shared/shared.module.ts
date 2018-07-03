import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { WikiButtonComponent } from './wiki-button/wiki-button.component';
import { ShelveButtonComponent } from './shelve-button/shelve-button.component';

@NgModule({
  imports: [
    CommonModule,
    IasMaterialModule,
  ],
  declarations: [
    WikiButtonComponent,
    ShelveButtonComponent,
  ],
  exports: [
    WikiButtonComponent,
    ShelveButtonComponent,
  ],
})
export class SharedModule { }
