import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewWeatherCardContentComponent } from './overview-weather-card-content.component';
import { RoutingService} from '../routing.service';


describe('OverviewWeatherCardContentComponent', () => {
  let component: OverviewWeatherCardContentComponent;
  let fixture: ComponentFixture<OverviewWeatherCardContentComponent>;
  let routingService: RoutingService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewWeatherCardContentComponent ],
      providers: [
          { provide: RoutingService, useValue: spyRoutingTable }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewWeatherCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('WHEN the component calls goToTableFilteredBy', () => {
    it('THEN the RoutingService.tableWithFilter is called', () => {
      component.goToTableFilteredBy('mock filter');
      fixture.whenStable().then(() => {
        expect(spyRoutingTable.tableWithFilter.calls.count())
          .toBe(1, 'spy method was called once');
        expect(spyRoutingTable.tableWithFilter.calls.mostRecent().args[0])
          .toBe('mock filter', 'spy method was called with the right parameters');
      });
    });
  });
});
