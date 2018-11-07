import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MockComponent } from 'ng2-mock-component';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { DataModule } from '../../data/data.module';
import { SharedModule } from '../../shared/shared.module';
import { HealthModule } from '../../health/health.module';
import { AntennasModule } from '../../antennas/antennas.module';
import { OverviewComponent } from './overview.component';
import { OverviewCardComponent } from '../overview-card/overview-card.component';
import { RoutingService} from '../../app-routing/routing.service';
import { AlarmComponent } from '../../shared/alarm/alarm.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  const spyRoutingTable = jasmine.createSpyObj('RoutingService', ['tableWithFilter']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IasMaterialModule,
        DataModule,
        HealthModule,
        SharedModule,
      ],
      declarations: [
        OverviewComponent,
        OverviewCardComponent,
        MockComponent({ selector: 'app-weather-summary'}),
        MockComponent({ selector: 'app-antennas-summary'})
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
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
