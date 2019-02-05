import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmTooltipComponent } from './alarm-tooltip.component';

describe('AlarmTooltipComponent', () => {
  let component: AlarmTooltipComponent;
  let fixture: ComponentFixture<AlarmTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
