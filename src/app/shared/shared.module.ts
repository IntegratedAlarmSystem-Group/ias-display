import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiButtonComponent } from './wiki-button/wiki-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WikiButtonComponent,
  ],
  exports: [
    WikiButtonComponent,
  ],
})
export class SharedModule { }
