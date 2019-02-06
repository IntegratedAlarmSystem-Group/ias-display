import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';
import { HealthSummaryComponent } from './health-summary.component';
import { RoutingService} from '../../app-routing/routing.service';
import { HttpClientService } from '../../data/http-client.service';
import { AlarmConfig } from '../../data/alarm-config';

const config = [
  {
    'alarm_id': 'ias-health',
    'custom_name': 'IAS Health',
    'type': 'health',
    'view': 'summary',
    'placemark': '',
    'group': '',
    'children': [],
  },
] as AlarmConfig[];

describe('HealthSummaryComponent', () => {
  let component: HealthSummaryComponent;
  let fixture: ComponentFixture<HealthSummaryComponent>;
  let httpClientService: HttpClientService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HealthSummaryComponent,
      ],
      imports: [
        IasMaterialModule,
        DataModule,
        SharedModule
      ],
      providers: [
        { provide: RoutingService, useValue: spyRoutingTable },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthSummaryComponent);
    component = fixture.componentInstance;
    httpClientService = fixture.debugElement.injector.get(HttpClientService);
    spyOn(httpClientService, 'get').and.callFake(function() {
      return of(config);
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('WHEN the component is created', () => {
    it('THEN the alarm id is requested to the webserver', () => {
      expect(httpClientService.get).toHaveBeenCalled();
      expect(component.alarmConfig[0].alarm_id).toEqual(config[0].alarm_id);
    });
  });

  describe('WHEN the component calls goToTableFilteredBy', () => {
    it('THEN the RoutingService.tableWithFilter is called', () => {
      component.goToTableFilteredBy('mock filter');
      expect(spyRoutingTable.tableWithFilter.calls.count()).toBe(1, 'spy method was called once');
      expect(spyRoutingTable.tableWithFilter.calls.mostRecent().args[0]).
        toBe('mock filter', 'spy method was called with the right parameters');
    });
  });
});
