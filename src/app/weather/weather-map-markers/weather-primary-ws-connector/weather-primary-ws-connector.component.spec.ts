import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPrimaryWsConnectorComponent } from './weather-primary-ws-connector.component';

describe('WeatherPrimaryWsConnectorComponent', () => {
  let component: WeatherPrimaryWsConnectorComponent;
  let fixture: ComponentFixture<WeatherPrimaryWsConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherPrimaryWsConnectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherPrimaryWsConnectorComponent);
    component = fixture.componentInstance;
    component.coords = [[0, 0]];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
