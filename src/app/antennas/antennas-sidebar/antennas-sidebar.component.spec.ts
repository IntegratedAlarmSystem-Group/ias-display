import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntennasSidebarComponent } from './antennas-sidebar.component';

describe('AntennasSidebarComponent', () => {
  let component: AntennasSidebarComponent;
  let fixture: ComponentFixture<AntennasSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntennasSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntennasSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
