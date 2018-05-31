import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularViewComponent } from './tabular-view.component';

describe('TabularViewComponent', () => {
  let component: TabularViewComponent;
  let fixture: ComponentFixture<TabularViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabularViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
