import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntennaMarkerComponent } from './antenna-marker.component';

xdescribe('AntennaMarkerComponent', () => {
  let component: AntennaMarkerComponent;
  let fixture: ComponentFixture<AntennaMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntennaMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennaMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
