import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { IasMaterialModule } from '../ias-material/ias-material.module';


@NgModule({
  imports: [
    CommonModule,
    IasMaterialModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
