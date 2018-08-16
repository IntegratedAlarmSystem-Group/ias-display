import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfomapOneSidebarComponent } from './infomap-one-sidebar.component';

describe('InfomapOneSidebarComponent', () => {
  let component: InfomapOneSidebarComponent;
  let fixture: ComponentFixture<InfomapOneSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfomapOneSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfomapOneSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
