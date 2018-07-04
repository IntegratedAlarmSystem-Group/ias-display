import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';
import { WeatherModule } from '../../weather/weather.module';
import { OverviewComponent } from './overview.component';
import { OverviewCardComponent } from '../overview-card/overview-card.component';
import { RoutingService} from '../../data/routing.service';
import { AlarmComponent } from '../../shared/alarm/alarm.component';
import { IasHealthOverviewComponent } from '../ias-health-overview/ias-health-overview.component';


describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgbModule.forRoot(),
        IasMaterialModule,
        DataModule,
        SharedModule,
        WeatherModule,
      ],
      declarations: [
        OverviewComponent,
        OverviewCardComponent,
        IasHealthOverviewComponent,
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
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
