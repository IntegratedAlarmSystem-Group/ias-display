import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWeatherCardContentComponent } from './overview-weather-card-content.component';

describe('OverviewWeatherCardContentComponent', () => {
  let component: OverviewWeatherCardContentComponent;
  let fixture: ComponentFixture<OverviewWeatherCardContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewWeatherCardContentComponent ]
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
});
