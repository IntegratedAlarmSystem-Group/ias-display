import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';
import { AntennasSummaryComponent } from './antennas-summary.component';
import { AntennasService } from '../antennas.service';
import { RoutingService} from '../../app-routing/routing.service';
import { mockImagesSets, mockImagesUnreliableSets, mockSummaryConfig } from '../tests_fixtures';


describe('AntennasSummaryComponent', () => {
  let component: AntennasSummaryComponent;
  let fixture: ComponentFixture<AntennasSummaryComponent>;
  let debug: DebugElement;
  let antennasService: AntennasService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter', 'goToAntennas']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AntennasSummaryComponent,
      ],
      imports: [
        IasMaterialModule,
        DataModule,
        SharedModule
      ],
      providers: [
        { provide: RoutingService, useValue: spyRoutingTable },
        AntennasService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasSummaryComponent);
    antennasService = fixture.debugElement.injector.get(AntennasService);
    spyOn(antennasService, 'initialize').and.callFake(function() {});
    antennasService.antennasSummaryConfig = mockSummaryConfig;
    antennasService.antennaImageSet = mockImagesSets;
    antennasService.antennaImageUnreliableSet = mockImagesUnreliableSets;
    component = fixture.componentInstance;
    debug = fixture.debugElement;
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
