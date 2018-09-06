import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { AlarmComponent, AlarmImageSet } from '../../shared/alarm/alarm.component';
import { AntennasSummaryComponent } from './antennas-summary.component';
import { AntennasService } from '../antennas.service';
import { RoutingService} from '../../data/routing.service';
import { AlarmService } from '../../data/alarm.service';

const AlarmID = 'antenna-dummy-alarm';

const mockImagesSets = new AlarmImageSet({
  clear: 'antennaImageSet',
  set_low: 'antennaImageSet',
  set_medium: 'antennaImageSet',
  set_high: 'antennaImageSet',
  set_critical: 'antennaImageSet',
  unknown: 'antennaImageSet',
  maintenance: 'antennaImageSet',
  shelved: 'antennaImageSet',
});

const mockImagesUnreliableSets = new AlarmImageSet({
  clear: 'antennaUnreliableImageSet',
  set_low: 'antennaUnreliableImageSet',
  set_medium: 'antennaUnreliableImageSet',
  set_high: 'antennaUnreliableImageSet',
  set_critical: 'antennaUnreliableImageSet',
  unknown: 'antennaUnreliableImageSet',
  maintenance: 'antennaUnreliableImageSet',
  shelved: 'antennaUnreliableImageSet',
});

describe('AntennasSummaryComponent', () => {
  let component: AntennasSummaryComponent;
  let fixture: ComponentFixture<AntennasSummaryComponent>;
  let debug: DebugElement;
  let alarmService: AlarmService;
  let antennasService: AntennasService;
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
        { provide: RoutingService, useValue: spyRoutingTable },
        AntennasService
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
    antennasService = fixture.debugElement.injector.get(AntennasService);
    spyOn(antennasService, 'initialize').and.callFake(function() {});
    antennasService.antennasSummaryConfig = AlarmID;
    antennasService.antennaImageSet = mockImagesSets;
    antennasService.antennaImageUnreliableSet = mockImagesUnreliableSets;
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    alarmService = fixture.debugElement.injector.get(AlarmService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('WHEN the component calls goToTableFilteredBy', () => {
    it('THEN the RoutingService.tableWithFilter is called', () => {
      const old_call_count = spyRoutingTable.tableWithFilter.calls.count();
      component.goToTableFilteredBy('mock filter');
      const new_call_count = spyRoutingTable.tableWithFilter.calls.count();
      expect(new_call_count).toBe(old_call_count + 1, 'tableWithFilter() was called once');
      expect(spyRoutingTable.tableWithFilter.calls.mostRecent().args[0]).
        toBe('mock filter', 'tableWithFilter was called with the right parameters');
    });
  });

  describe('WHEN the component calls redirect', () => {
    it('THEN the RoutingService.goToAntennas is called', () => {
      const old_call_count = spyRoutingTable.goToAntennas.calls.count();
      component.redirect();
      const new_call_count = spyRoutingTable.goToAntennas.calls.count();
      expect(new_call_count).toBe(old_call_count + 1, 'goToAntennas() was called once');
    });
  });

  describe('AND WHEN the user clicks on it', () => {
    it('THEN the RoutingService.goToAntennas is called', () => {
      const old_call_count = spyRoutingTable.goToAntennas.calls.count();
      const mainPanel = debug.query(By.css('.content')).nativeElement;
      mainPanel.click();
      const new_call_count = spyRoutingTable.goToAntennas.calls.count();
      expect(mainPanel).toBeTruthy();
      expect(new_call_count).toBe(old_call_count + 1, 'goToAntennas() was called once');
    });
  });

});