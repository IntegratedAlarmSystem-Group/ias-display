import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataModule } from '../data/data.module';
import { OverviewWeatherCardContentComponent } from './overview-weather-card-content.component';
import { RoutingService} from '../data/routing.service';
import { AlarmComponent } from '../alarm//alarm.component';
import { AlarmService } from '../data/alarm.service';


describe('OverviewWeatherCardContentComponent', () => {
  let component: OverviewWeatherCardContentComponent;
  let fixture: ComponentFixture<OverviewWeatherCardContentComponent>;
  let alarmService: AlarmService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OverviewWeatherCardContentComponent,
        AlarmComponent,
      ],
      imports: [
        HttpClientModule,
        NgbModule.forRoot(),
        IasMaterialModule,
        DataModule,
      ],
      providers: [
        { provide: RoutingService, useValue: spyRoutingTable },
        HttpClient
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
    fixture = TestBed.createComponent(OverviewWeatherCardContentComponent);
    component = fixture.componentInstance;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
