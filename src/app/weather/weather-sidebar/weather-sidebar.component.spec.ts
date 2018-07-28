import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ActionsModule } from '../../actions/actions.module';
import { DataModule } from '../../data/data.module';
import { WeatherSidebarComponent } from './weather-sidebar.component';
import { WeatherStationSidebarComponent } from '../weather-station-sidebar/weather-station-sidebar.component';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { Alarm } from '../../data/alarm';

describe('WeatherSidebarComponent', () => {
  let component: WeatherSidebarComponent;
  let fixture: ComponentFixture<WeatherSidebarComponent>;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);
  let weatherService: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherSidebarComponent,
        WeatherStationSidebarComponent,
      ],
      providers: [
        WeatherService,
        { provide: Router, useValue: spyRoutingTable },
      ],
      imports: [
        IasMaterialModule,
        SharedModule,
        ActionsModule,
        DataModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(
    inject([WeatherService], (service) => {
      weatherService = service;
      spyOn(weatherService, 'initialize')
        .and.callFake(function() {});
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
