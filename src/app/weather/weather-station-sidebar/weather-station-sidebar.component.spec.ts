import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherStationSidebarComponent } from './weather-station-sidebar.component';

describe('WeatherStationSidebarComponent', () => {
  let component: WeatherStationSidebarComponent;
  let fixture: ComponentFixture<WeatherStationSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherStationSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherStationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
