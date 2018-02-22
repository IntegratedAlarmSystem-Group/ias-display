import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsTableComponent, StatusViewComponent } from './alarms-table.component';
import { NbCardModule } from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';


describe('AlarmsTableComponent', () => {
  let component: AlarmsTableComponent;
  let fixture: ComponentFixture<AlarmsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmsTableComponent ,
        StatusViewComponent
      ],
      imports: [
        NbCardModule,
        Ng2SmartTableModule
      ]
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
