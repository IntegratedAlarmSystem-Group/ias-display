import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


/**
* Module for the required Angular Material components
*/
@NgModule({
  imports: [
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: []
})
export class IasMaterialModule { }
