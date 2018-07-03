import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { DataModule } from '../data/data.module';
import { AckTreeComponent } from './ack-tree.component';
import { Alarm } from '../data/alarm';


describe('AckTreeComponent', () => {
  let component: AckTreeComponent;
  let fixture: ComponentFixture<AckTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AckTreeComponent
      ],
      imports: [
        IasMaterialModule,
        HttpClientModule,
        DataModule,
      ],
      providers: [
        HttpClient,
      ]
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
      'shelved': false,
      'dependencies': [],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
