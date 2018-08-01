import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherMarkerMapComponent } from './weather-marker-map.component';

describe('WeatherMarkerMapComponent', () => {
  let component: WeatherMarkerMapComponent;
  let fixture: ComponentFixture<WeatherMarkerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherMarkerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherMarkerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
