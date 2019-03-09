import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { MaterialColorsComponent } from './material-sandbox.components';
import { MaterialToggleColorsComponent } from './material-sandbox.components';
import { MaterialButtonsColorsComponent } from './material-sandbox.components';
import { MaterialCardSampleComponent } from './material-sandbox.components';
import { SandboxAlarmLabelComponent } from './material-sandbox.components';
import { SandboxAlarmComponent } from './material-sandbox.components';
import { SandboxAlarmTileComponent } from './material-sandbox.components';

@NgModule({
  imports: [
    CommonModule,
    IasMaterialModule,
    SharedModule,
    NgbModule
  ],
  declarations: [
    MaterialColorsComponent,
    MaterialToggleColorsComponent,
    MaterialButtonsColorsComponent,
    MaterialCardSampleComponent,
    SandboxAlarmLabelComponent,
    SandboxAlarmComponent,
    SandboxAlarmTileComponent
  ],
  exports: [
    MaterialColorsComponent,
    MaterialToggleColorsComponent,
    MaterialButtonsColorsComponent,
    MaterialCardSampleComponent,
    SandboxAlarmLabelComponent,
    SandboxAlarmComponent,
    SandboxAlarmTileComponent
  ],
  entryComponents: [
  ]
})
export class MaterialSandboxModule { }
