import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { HealthSummaryComponent } from './health-summary.component';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { RoutingService} from '../../app-routing/routing.service';
import { HttpClientService } from '../../data/http-client.service';
import { AlarmService } from '../../data/alarm.service';

fdescribe('HealthSummaryComponent', () => {
  let component: HealthSummaryComponent;
  let fixture: ComponentFixture<HealthSummaryComponent>;
  let alarmService: AlarmService;
  let httpClientService: HttpClientService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HealthSummaryComponent,
        AlarmComponent
      ],
      imports: [
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        { provide: RoutingService, useValue: spyRoutingTable },
      ],
    })
    .overrideModule( BrowserDynamicTestingModule , {
      set: {
        entryComponents: [ AlarmComponent ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthSummaryComponent);
    component = fixture.componentInstance;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    httpClientService = fixture.debugElement.injector.get(HttpClientService);
    spyOn(httpClientService, 'get').and.callFake(function() {
      return of('ias-health');
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('WHEN the component is created', () => {
    it('THEN the alarm id is requested to the webserver', () => {
      expect(httpClientService.get).toHaveBeenCalled();
      expect(component.alarmId).toEqual('ias-health');
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
