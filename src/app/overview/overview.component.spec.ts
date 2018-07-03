import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModule, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IasMaterialModule } from '../ias-material/ias-material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataModule } from '../data/data.module';
import { OverviewComponent } from './overview.component';
import { OverviewCardComponent } from '../overview-card/overview-card.component';
import {
  OverviewWeatherCardContentComponent
} from '../overview-weather-card-content/overview-weather-card-content.component';
import { RoutingService} from '../routing.service';
import { HttpClientService } from '../http-client.service';
import { CdbService } from '../cdb.service';
import { AlarmComponent } from '../alarm//alarm.component';
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
      ],
      declarations: [
        OverviewComponent,
        OverviewCardComponent,
        OverviewWeatherCardContentComponent,
        IasHealthOverviewComponent,
        AlarmComponent,
      ],
      providers: [
          { provide: RoutingService, useValue: spyRoutingTable },
          CdbService,
          HttpClientService,
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
