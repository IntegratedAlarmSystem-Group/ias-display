import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmService } from '../alarm.service';
import { AlarmsTableComponent, StatusViewComponent } from './alarms-table.component';
import { NbCardModule } from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DatePipe } from '@angular/common';

describe('AlarmsTableComponent', () => {
  let component: AlarmsTableComponent;
  let fixture: ComponentFixture<AlarmsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmsTableComponent,
        StatusViewComponent
      ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule
      ],
      providers: [
        AlarmService,
        DatePipe
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
