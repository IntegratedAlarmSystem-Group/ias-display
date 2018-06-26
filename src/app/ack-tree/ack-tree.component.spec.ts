import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckTreeComponent } from './ack-tree.component';

import { IasMaterialModule } from '../ias-material/ias-material.module';

import { Alarm } from '../alarm';


describe('AckTreeComponent', () => {
  let component: AckTreeComponent;
  let fixture: ComponentFixture<AckTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckTreeComponent ],
      imports: [ IasMaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckTreeComponent);
    component = fixture.componentInstance;
    component.selectedAlarm = Alarm.asAlarm({
      'value': 0,
      'core_id': '',
      'running_id': '',
      'mode': '',
      'core_timestamp': 1,
      'validity': '0',
      'ack': false,
      'dependencies': [],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
