import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AlarmService } from '../alarm.service';
import { CdbService } from '../cdb.service';
import { AlarmsListComponent } from './alarms-list.component';

import { NbCardModule } from '@nebular/theme';

describe('AlarmsListComponent', () => {
  let component: AlarmsListComponent;
  let fixture: ComponentFixture<AlarmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmsListComponent
      ],
      imports: [
        NbCardModule,
        HttpClientModule
      ],
      providers: [
        AlarmService,
        CdbService,
        HttpClient
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
