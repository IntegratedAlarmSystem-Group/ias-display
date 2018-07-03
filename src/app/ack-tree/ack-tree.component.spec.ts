import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AckTreeComponent } from './ack-tree.component';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { HttpClientService } from '../http-client.service';
import { AlarmService } from '../data/alarm.service';
import { CdbService } from '../cdb.service';
import { Alarm } from '../alarm';


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
      ],
      providers: [
        AlarmService,
        CdbService,
        HttpClientService,
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
