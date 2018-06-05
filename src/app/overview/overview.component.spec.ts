import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { OverviewCardComponent } from '../overview-card/overview-card.component';
import { OverviewWeatherCardContentComponent } from '../overview-weather-card-content/overview-weather-card-content.component';
import { RoutingService} from '../routing.service';


describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let routingService: RoutingService;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter']);
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OverviewComponent,
        OverviewCardComponent,
        OverviewWeatherCardContentComponent
      ],
      providers: [
          { provide: RoutingService, useValue: spyRoutingTable }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
