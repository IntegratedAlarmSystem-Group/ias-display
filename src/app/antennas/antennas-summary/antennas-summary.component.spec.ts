import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { RoutingService} from '../../data/routing.service';
import { AlarmService } from '../../data/alarm.service';

import { AntennasSummaryComponent } from './antennas-summary.component';

describe('AntennasSummaryComponent', () => {
  let component: AntennasSummaryComponent;
  let fixture: ComponentFixture<AntennasSummaryComponent>;
  let alarmService: AlarmService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter', 'goToAntennas']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AntennasSummaryComponent,
        AlarmComponent
      ],
      imports: [
        IasMaterialModule,
        DataModule
      ],
      providers: [
        { provide: RoutingService, useValue: spyRoutingTable }
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
    fixture = TestBed.createComponent(AntennasSummaryComponent);
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


  describe('WHEN the component calls redirect', () => {
    it('THEN the RoutingService.goToAntennas is called', () => {
      component.redirect();
      expect(spyRoutingTable.goToAntennas.calls.count()).toBe(1, 'spy method was called once');
    });
  });

});
